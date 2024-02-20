import React from "react";
import Style from "./Loader.module.css";
import { ThreeDots } from "react-loader-spinner";
function Loader() {
    return (
        <div className={Style.loder}><ThreeDots
        visible={true}
        height="100"
        width="150"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div>
    )
}

export default Loader;
