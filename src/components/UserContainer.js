import React, { useState, useEffect } from "react";
import Container from "./Container"
import Jumbotron from "./Jumbotron/index";
import SearchBar from "./SearchBar/index";
import Row from "./Row/index.js";
import Table from "./Table";
import TableRows from "./TableRow";
import API from "../utils/API";

function UserContainer() {
    // before the API call the state of users will be null, which means that 
    // nothing will be rendered in the table rows because there's a 
    // conditional below in the return, by the Table tag
    const [users, setUsers] = useState(null);
    const [names, setNames] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [endDOB, setEndDOB] = useState("mm/dd/yyyy");
    const [startDOB, setStartDOB] = useState("mm/dd/yyyy");
    const [sorted, setSorted] = useState(null);



    useEffect(() => {
        API.getUsers()
            .then(res => {
                setUsers(res.data.results);
                let namesArr = [];
                res.data.results.map(result => {
                    const sameName = (nameArr) => { return nameArr === result.name.first }
                    if (!namesArr.some(sameName)) {
                        return namesArr.push(result.name.first);
                    }
                });
                setNames(namesArr);
            })
            .catch(err => console.log(err));
        // include the second argument as an empty array to prevent 
        // an infinite loop of API calls
    }, []);


    // Reset the table to display all entries
    const clearBtn = event => {
        event.preventDefault();
        // clear the value of the input nameSearch
        setSearchName("");
        setEndDOB("mm/dd/yyyy");
        setStartDOB("mm/dd/yyyy");
        setSorted(null)
    }

    // Display only selected names
    const handleNameChange = event => {
        setSearchName(event.target.value);
    };

    // Set the end of the date range for narrowed display of results
    const handleEndDOBChange = event => {
        setEndDOB(event.target.value);
    }

    // Set the beginning of the date range for narrowed display of results
    const handleStartDOBChange = event => {
        setStartDOB(event.target.value);
    }

    // Sort display by selected column
    const sortByColumn = event => {
        event.preventDefault();
        console.log(event.target.id);

        var sortedUsers;
        if (event.target.id === "username") {
            users.sort((a, b) => (a.login.username > b.login.username) ? 1 : -1);
            sortedUsers = users;
        }
        else if (event.target.id === "image") {
            users.sort((a, b) => (a.picture.medium > b.picture.medium) ? 1 : -1);
            sortedUsers = users;
        }
        else if (event.target.id === "email") {
            users.sort((a, b) => (a.email > b.email) ? 1 : -1);
            sortedUsers = users;
        }
        else if (event.target.id === "dob") {
            users.sort((a, b) => (a.dob.date > b.dob.date) ? 1 : -1);
            sortedUsers = users;
        }
        else if (event.target.id === "name") {
            users.sort((a, b) => {
                if (a.name.first > b.name.first) {
                    return 1
                }
                else if (a.name.first === b.name.first) {
                    if (a.name.last > b.name.last) {
                        return 1
                    } else {
                        return -1
                    }
                }
                else {
                    return -1
                }
            });
            sortedUsers = users;
        }
        // use spread operator to clear the old array and make javascript 
        // understand the new one is different
        setSorted([...sortedUsers]);
        console.log(sorted);
        console.log(sortedUsers)
    }

    return (
        <Container>
            <Jumbotron />
            <Row rowClass="top-row">
                {names && <SearchBar
                    clearBtn={clearBtn}
                    handleNameChange={handleNameChange}
                    names={names}
                    searchName={searchName}
                    endDOB={endDOB}
                    handleEndDOBChange={handleEndDOBChange}
                    startDOB={startDOB}
                    handleStartDOBChange={handleStartDOBChange}
                />
                }
            </Row>
            <Row rowClass="bottom-row">
                {/* users && -> render users onl when we have a user, this will prevent that 
                at the beginning of loading, before the api gets the data 
                we receive an error because we don't have users */}

                {/* Renders selection of Name & sorted by column */}
                {users && searchName !== "" && startDOB === "mm/dd/yyyy" && endDOB === "mm/dd/yyyy" && <Table
                    sortByColumn={sortByColumn}
                >
                    {sorted && sorted.map(user => {
                        if (searchName === user.name.first) {
                            return <TableRows
                                key={user.login.uuid}
                                picture={user.picture.medium}
                                name={user.name}
                                username={user.login.username}
                                email={user.email}
                                dob={user.dob.date}
                            />
                        }
                    })
                    }
                    {sorted == null && users.map(user => {
                        if (searchName === user.name.first) {
                            return <TableRows
                                key={user.login.uuid}
                                picture={user.picture.medium}
                                name={user.name}
                                username={user.login.username}
                                email={user.email}
                                dob={user.dob.date}
                            />
                        }
                    })
                    }
                </Table>}
                {/* Renders selection of DOB & sorted by column*/}
                {users && searchName === "" && startDOB !== "mm/dd/yyyy" && endDOB !== "mm/dd/yyyy" && <Table
                    sortByColumn={sortByColumn}
                >
                    {sorted && sorted.map(user => {
                        let userDOB = parseInt(user.dob.date.split("-")[0] + user.dob.date.split("-")[1] + user.dob.date.split("-")[2].slice(0, 2));
                        let endDOBSearch = parseInt(endDOB.replace(/-/g, ""));
                        let startDOBSearch = parseInt(startDOB.replace(/-/g, ""));
                        if (endDOBSearch >= userDOB && startDOBSearch <= userDOB) {
                            return <TableRows
                                key={user.login.uuid}
                                picture={user.picture.medium}
                                name={user.name}
                                username={user.login.username}
                                email={user.email}
                                dob={user.dob.date}
                            />
                        }
                    })
                    }
                    {sorted == null && users.map(user => {
                        let userDOB = parseInt(user.dob.date.split("-")[0] + user.dob.date.split("-")[1] + user.dob.date.split("-")[2].slice(0, 2));
                        let endDOBSearch = parseInt(endDOB.replace(/-/g, ""));
                        let startDOBSearch = parseInt(startDOB.replace(/-/g, ""));
                        if (endDOBSearch >= userDOB && startDOBSearch <= userDOB) {
                            return <TableRows
                                key={user.login.uuid}
                                picture={user.picture.medium}
                                name={user.name}
                                username={user.login.username}
                                email={user.email}
                                dob={user.dob.date}
                            />
                        }
                    })
                    }
                </Table>}
                {/* Renders selection of DOB and Name & sorts by column */}
                {users && searchName !== "" && startDOB !== "mm/dd/yyyy" && endDOB !== "mm/dd/yyyy" && <Table
                    sortByColumn={sortByColumn}
                >
                    {sorted && sorted.map(user => {
                        let userDOB = parseInt(user.dob.date.split("-")[0] + user.dob.date.split("-")[1] + user.dob.date.split("-")[2].slice(0, 2));
                        let endDOBSearch = parseInt(endDOB.replace(/-/g, ""));
                        let startDOBSearch = parseInt(startDOB.replace(/-/g, ""));
                        if (endDOBSearch >= userDOB && startDOBSearch <= userDOB && searchName === user.name.first) {
                            return <TableRows
                                key={user.login.uuid}
                                picture={user.picture.medium}
                                name={user.name}
                                username={user.login.username}
                                email={user.email}
                                dob={user.dob.date}
                            />
                        }
                    })
                    }
                    {sorted == null && users.map(user => {
                        let userDOB = parseInt(user.dob.date.split("-")[0] + user.dob.date.split("-")[1] + user.dob.date.split("-")[2].slice(0, 2));
                        let endDOBSearch = parseInt(endDOB.replace(/-/g, ""));
                        let startDOBSearch = parseInt(startDOB.replace(/-/g, ""));
                        if (endDOBSearch >= userDOB && startDOBSearch <= userDOB && searchName === user.name.first) {
                            return <TableRows
                                key={user.login.uuid}
                                picture={user.picture.medium}
                                name={user.name}
                                username={user.login.username}
                                email={user.email}
                                dob={user.dob.date}
                            />
                        }
                    })
                    }
                </Table>}
                {/* Renders all table rows on load and after Reset is clicked & sorted by column*/}
                {users && searchName === "" && endDOB === "mm/dd/yyyy" && <Table
                    sortByColumn={sortByColumn}
                >
                    {sorted && sorted.map(user => (
                        <TableRows
                            key={user.login.uuid}
                            picture={user.picture.medium}
                            name={user.name}
                            username={user.login.username}
                            email={user.email}
                            dob={user.dob.date}
                        />
                    ))
                    }
                    {sorted == null && users.map(user => (
                        <TableRows
                            key={user.login.uuid}
                            picture={user.picture.medium}
                            name={user.name}
                            username={user.login.username}
                            email={user.email}
                            dob={user.dob.date}
                        />
                    ))
                    }
                </Table>}
            </Row>
        </Container>
    );
}

export default UserContainer;