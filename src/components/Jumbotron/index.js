import React, { Component } from "react";
import "./style.css";

class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid text-center">
                    <h1>User Directory</h1>
                    <p>Sort the displayed information by column or use the Search Box to narrow your results </p>
            </div>
        )
    }
}

export default Jumbotron;