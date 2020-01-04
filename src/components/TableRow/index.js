import React from "react";
import "./style.css"

function TableRows(props) {
    return (
        <tr>
            <td id="image">
                <img src={props.picture} alt="profile pic"></img>
            </td>
            <td id="name">{props.name.first + " " + props.name.last}</td>
            <td id="username">{props.username}</td>
            <td id="email">{props.email}</td>
            <td id="dob">{props.dob.split("-")[1] + "/" + props.dob.split("-")[2].slice(0,2) + "/" + props.dob.split("-")[0]}</td>
        </tr>
    )
}

export default TableRows;