import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase.config";
import { setUser } from "../store/userSlice"
import OpenAI from "openai";
import { setImages } from "../store/imagesSlice";
import { setIsLoading } from "../store/loaderSlice";
import { useRef } from "react";

// icons
import { IoLogOutOutline } from "react-icons/io5";

import FullScreenLoader from "../components/FullScreenLoader";

const APIKey = "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";
const openai = new OpenAI({ apiKey: APIKey, dangerouslyAllowBrowser: true });

const UserLayout = () => {
    const dispatch = useDispatch();
    const imgs = useSelector(state => state.imagesSlice.images);
    const inputRef = useRef();

    const logoutHandler = () => {
        signOut(auth).then(() => {
            dispatch(setUser(null));
        }).catch(err => {
            console.log("Error: ", err);
        })
    }

    const generateImages = async (e) => {
        e.preventDefault();
        dispatch(setIsLoading(true));

        try {
            const images = await openai.images.generate({ model: "dall-e-2", prompt: inputRef.current.value, n: 3, size: "512x512" });

            dispatch(setImages(images.data));
            console.log(images.data);
        } catch (error) {
            dispatch(setIsLoading(false));
            console.error("Error generating images:", error);
            // Handle error, e.g., display an error message to the user
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <div className="app box column container">
            <div className="box">
                <h2>imgages generator</h2>
                <button className="icon" onClick={logoutHandler}><IoLogOutOutline size={"24px"} /></button>
            </div>
            <div className="imags-container">
                {imgs ? imgs.map(img => (
                    <div key={img.url} style={{ backgroundImage: `url('${img.url}')` }}></div>
                )) : (
                    <>
                        <div>
                            <FullScreenLoader />
                        </div>
                        <div>
                            <FullScreenLoader />
                        </div>
                        <div>
                            <FullScreenLoader />
                        </div>
                    </>
                )}
            </div>
            <form className="input-container box">
                <input ref={inputRef} type="text" />
                <button onClick={(e) => generateImages(e)}>generate</button>
            </form>
        </div>
    )
}

export default UserLayout