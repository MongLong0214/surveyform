import React from "react";

const IconClose = () => {
    return (
        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'inline-block', padding: '8px', borderRadius: '6px', marginLeft:'10px'}}>
            <svg
                width="10"
                height="10"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M7 1L1 7" stroke="#CCC4C4" strokeWidth="1.4" />
                <path d="M1 1L7 7" stroke="#CCC4C4" strokeWidth="1.4" />
            </svg>
        </div>
    );
};

export default IconClose;
