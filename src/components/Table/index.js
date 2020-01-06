import React from "react";
import "./style.css";

function Table(props) {
    return (
        <div className="results col-md-11 mt-5">

            <table className="table table-striped table-sortable">
                <thead className="head">
                    <tr>
                        <th onClick={props.sortByColumn} className="header" id="image" scope="col">Profile Pic</th>
                        <th onClick={props.sortByColumn} className="header" id="name" scope="col">Name</th>
                        <th onClick={props.sortByColumn} className="header" id="username" scope="col">Username</th>
                        <th onClick={props.sortByColumn} className="header" id="email" scope="col">Email</th>
                        <th onClick={props.sortByColumn} className="header" id="dob" scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}
  

export default Table;