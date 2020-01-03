import React from "react";
import "./style.css";

function Table(props) {
    return (
        <div className="results col-md-11 mt-5">

            <table className="table table-striped">
                <thead className="head">
                    <tr>
                        <th id="image" scope="col">Image</th>
                        <th id="name" scope="col">Name</th>
                        <th id="phone" scope="col">Phone</th>
                        <th id="email" scope="col">Email</th>
                        <th id="dob" scope="col">DOB</th>
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