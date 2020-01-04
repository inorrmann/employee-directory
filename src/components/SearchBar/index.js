import React from "react";

function SearchBar(props) {
    return (
        <div className="search-form">
            <form className="form-inline py-3 d-flex justify-content-center">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">DOB</span>
                    </div>
                    <input type="date" className="form-control" name="startDate" id="startDate" />
                    <input type="date" className="form-control" name="endDate" id="endDate" />
                </div>
                <input type="text" className="form-control col-md-2 mx-5" name="nameSearch" id="nameSearch" placeholder="Name" />
                <button onClick={props.handleFormSubmit} type="submit" className="btn btn-light border-dark">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;