import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
    return (
        <div>
            <ReactLoading type="spokes" color="#000000"
                height={100} width={50} />
        </div>
    );
}