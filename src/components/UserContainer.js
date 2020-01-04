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
    const [endDOB, setEndDOB] = useState("mm/dd/yyyy")


    useEffect(() => {
        API.getUsers()
            .then(res => {
                setUsers(res.data.results);
                let namesArr = [];
                res.data.results.map(result => {
                    return namesArr.push(result.name.first);
                });
                console.log(res);
                setNames(namesArr);
                console.log(namesArr);
            })
            .catch(err => console.log(err));
        // include the second argument as an empty array to prevent 
        // an infinite loop of API calls
    }, []);

    const clearBtn = event => {
        event.preventDefault();
        // clear the value of the input nameSearch
        setSearchName("");
        setEndDOB("mm/dd/yyyy");
    }

    const handleNameChange = event => {
        setSearchName(event.target.value);
    };

    const handleEndDOBChange = event => {
        setEndDOB(event.target.value);
        console.log(event.target.value);
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
                />
                }
            </Row>
            <Row rowClass="bottom-row">
                {/* users && -> render users onl when we have a user, this will prevent that 
                at the beginning of loading, before the api gets the data 
                we receive an error because we don't have users */}

                {/* Renders select table rows after name has been entered */}
                {users && searchName !== "" && <Table>
                    {users.map(user => {
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
                {/* Renders selection of table rows by endDOB */}
                {users && searchName === "" && endDOB !== "mm/dd/yyyy" && <Table>
                    {users.map(user => {
                        if (endDOB.split("-")[0] >= user.dob.date.split("-")[0] && endDOB.split("-")[1] >= user.dob.date.split("-")[1] && endDOB.split("-")[2] >= user.dob.date.split("-")[2].slice(0, 2)) {
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
                {/* Renders table rows on load and after Reset is clicked*/}
                {users && searchName === "" && endDOB === "mm/dd/yyyy" && <Table>
                    {users.map(user => (
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