import React, { Component } from "react";
import Container from "./Container"
import Jumbotron from "./Jumbotron/index";
import SearchBar from "./SearchBar/index";
import Row from "./Row/index.js"
// import API from "../utils/API";

class UserContainer extends Component {

    render() {
        return (
            <Container>
                <Jumbotron />
                <Row rowClass="top-row">
                    <SearchBar

                    />
                </Row>
                <Row rowClass="bottom-row">

                </Row>
            </Container>
        );
    }
}

export default UserContainer;