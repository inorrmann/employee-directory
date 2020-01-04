import React from "react";

function SearchBar(props) {
    return (
        <div className="search-form">
            <form className="form-inline py-3 d-flex justify-content-center">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">DOB</span>
                    </div>
                    <input
                        value={props.startDOB}
                        onChange={props.handleStartDOBChange}
                        type="date"
                        className="form-control"
                        name="startDate"
                        id="startDate"
                    />
                    <input
                    value={props.endDOB}
                    onChange={props.handleEndDOBChange}
                        type="date"
                        className="form-control"
                        name="endDate"
                        id="endDate"
                    />
                </div>
                <input
                    value={props.searchName}
                    onChange={props.handleNameChange}
                    list="names"
                    type="text"
                    className="form-control col-md-2 mx-5"
                    name="nameSearch"
                    id="nameSearch"
                    placeholder="Name"
                />
                <datalist id="names">
                    {props.names.map(name => (
                        <option value={name} key={name} />
                    ))}
                </datalist>
                <button onClick={props.clearBtn} type="submit" className="btn btn-danger border-dark">Reset</button>
            </form>
        </div>
    );
}

export default SearchBar;