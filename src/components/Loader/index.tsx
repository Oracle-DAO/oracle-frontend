import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loader.scss";

function Loader({ theme }: { theme?: string }) {
    let className = "loader-wrap ";
    if (theme && theme == "light") {
        className += "light";
    }
    return (
        <div className={className}>
            <CircularProgress size={120} color="inherit" />
        </div>
    );
}

export default Loader;
