import React from "react";
import Style from "./Loader.module.css";
import { ThreeDots } from "react-loader-spinner";
function Loader({heigth}) {
    return (
        <div className={Style.loder} style={{height:heigth}}><ThreeDots
        visible={true}
        height="100"
        width="150"
        color="#0B7077"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div>
    )
}

export default Loader;
