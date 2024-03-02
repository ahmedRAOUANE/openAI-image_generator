import { useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";


const Signup = () => {
    const [credencials, setCredencials] = useState({});
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, credencials.email, credencials.password)
            .then(userCredencials => {
                dispatch(setUser({ id: userCredencials.user.uid, email: userCredencials.user.email }))
            })
            .catch(err => {
                dispatch(setUser(null))
                console.log("Error: ", err);
            })
    }

    return (
        <div className="container">
            <h2>Signup</h2>
            <form className="box column">
                <input type="email" placeholder="email" onChange={(e) => setCredencials({ ...credencials, email: e.target.value })} />
                <input type="text" placeholder="password" onChange={(e) => setCredencials({ ...credencials, password: e.target.value })} />
                <input type="submit" value='signup' onClick={(e) => submitHandler(e)} className="button" />
            </form>
        </div>
    )
}

export default Signup