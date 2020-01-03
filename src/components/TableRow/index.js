import React from "react";
import "./style.css"

function TableRows(props) {
    return (
        <tr>
            {/* <td id="image">{props.image}</td>
            <td id="name">{props.name}</td>
            <td id="phone">{props.phone}</td>
            <td id="email">{props.email}</td>
            <td id="dob">{props.dob}</td> */}
            <td id="image">picture</td>
            <td id="name">NAME</td>
            <td id="phone">999-000-0000</td>
            <td id="email">email@email.com</td>
            <td id="dob">00/00/9999</td>
        </tr>
    )
}

export default TableRows;