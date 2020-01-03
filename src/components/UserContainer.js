import React, { Component } from "react";
import Container from "./Container"
import Jumbotron from "./Jumbotron/index";
import SearchBar from "./SearchBar/index";
import Row from "./Row/index.js";
import Table from "./Table";
import TableRows from "./TableRow";
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
                    <Table>
                        <TableRows
                            // image={this.state.result.SOMETHING}
                            // name={this.state.result.SOMETHING}
                            // phone={this.state.result.SOMETHING}
                            // email={this.state.result.SOMETHING}
                            // dob={this.state.result.SOMETHING}
                        />
                    </Table>
                </Row>
            </Container>
        );
    }
}

export default UserContainer;