import React from 'react';
import {CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <div className="flex justify-center items-center absolute h-full w-full z-30 backdrop-blur-sm top-auto">
            <CircularProgress/>
        </div>
    );
};

export default Loading;