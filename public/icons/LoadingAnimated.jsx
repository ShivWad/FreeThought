import React from "react";

function LoadingAnimated() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "auto" }}
            width="200"
            height="200"
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <path fill="#e1e7e0" d="M16 50a34 34 0 0068 0 34 36.7 0 01-68 0">
                <animateTransform
                    attributeName="transform"
                    dur="0.9900990099009901s"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 50 51.35;360 50 51.35"
                ></animateTransform>
            </path>
        </svg>
    );
}

export default LoadingAnimated;
