import React, { useState } from "react";
import "./wrap-button.scss";

function WrapButton() {
    const [showWrap, setShowWrap] = useState(false);

    const handelOpenWrap = () => {
        setShowWrap(true);
    };

    const handelCloseWrap = () => {
        setShowWrap(false);
    };

    return (
        <div>
            <div className="wrap-button">
                <p>Collect Rewards</p>
            </div>
        </div>
    );
}

export default WrapButton;
