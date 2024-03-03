/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import "../styles/loader.css";

const FullScreenLoader = ({ solid }) => {
    const isLoading = useSelector(state => state.loaderSlice.isLoading);

    return isLoading && (
        <div style={{ backgroundColor: solid ? "#fff" : "" }} className="loader-overlay" >
            <div className="loader"></div>
        </div >
    )
}

export default FullScreenLoader