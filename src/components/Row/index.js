import React from "react";
import "./style.css"

function Row(props) {
    return (
    <div className={`col-md-12 ${props.rowClass}`}>
        {props.children}
    </div>
);
}

export default Row;