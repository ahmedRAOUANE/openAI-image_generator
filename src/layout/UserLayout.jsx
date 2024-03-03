import OpenAI from "openai";
import { useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { setUser } from "../store/userSlice"
import { setImages } from "../store/imagesSlice";
import { setIsLoading } from "../store/loaderSlice";
import { useDispatch, useSelector } from "react-redux";

// icons
import { IoLogOutOutline } from "react-icons/io5";

// components
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
            const images = await openai.images.generate({ model: "dall-e-3", prompt: inputRef.current.value, n: 1, size: "1024x1024" });

            dispatch(setImages(images.data));
            console.log(images.data);
        } catch (error) {
            dispatch(setIsLoading(false));
            console.error("Error generating images:", error);
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <div className="app box column container">
            <div className="box over">
                <h2>imgages generator</h2>
                <button className="icon" onClick={logoutHandler}><IoLogOutOutline size={"24px"} /></button>
            </div>
            <div className="imags-container">
                {imgs ? imgs.map(img => (
                    <div key={img.url} style={{ backgroundImage: `url('${img.url}')` }}></div>
                )) : (
                    <>
                        {[1,2,3].map(el => (
                            <div key={el}>
                                <FullScreenLoader />
                            </div>
                        ))}
                    </>
                )}
            </div>
            <form className="input-container box over">
                <input ref={inputRef} type="text" />
                <button onClick={(e) => generateImages(e)}>generate</button>
            </form>
        </div>
    )
}

export default UserLayout