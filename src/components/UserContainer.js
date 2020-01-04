import React, { useState, useEffect } from "react";
import Container from "./Container"
import Jumbotron from "./Jumbotron/index";
import SearchBar from "./SearchBar/index";
import Row from "./Row/index.js";
import Table from "./Table";
import TableRows from "./TableRow";
import API from "../utils/API";

function UserContainer() {
    const [users, setUsers] = useState(null)
    // const [users, setUsers] = useState({
    //     results: {}
    // })


    useEffect(() => {
        API.getUsers()
            .then(res => {
                setUsers(res.data.results);
                console.log(res);
            })
            .catch(err => console.log(err));
        // include the second argument as an empty array to prevent 
        // an infinite loop of API calls
    }, []);



    return (
        <Container>
            <Jumbotron />
            <Row rowClass="top-row">
                <SearchBar

                />
            </Row>
            <Row rowClass="bottom-row">
                {/* render users when we have a user, this will prevent that 
                at the beginning of loading, before the api gets the data 
                we receive an error because we don't have users */}
                {users && <Table>
                    {users.map(user => (
                        <TableRows
                            key={user.login.uuid}
                            picture={user.picture.thumbnail}
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