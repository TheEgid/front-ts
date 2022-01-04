import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface SpinnerProps {
    height?: number;
    width?: number;
}

const Spinner = ({ height = 15, width = 15 }: SpinnerProps) => (
    <div className="spinner">
        <p>Загружаем...</p>
        <Loader type="Circles" color="#000000" height={height} width={width} />
    </div>
);

export default Spinner;
