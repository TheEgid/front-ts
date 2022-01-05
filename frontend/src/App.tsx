import React from "react";
import "./custom.scss";
import Spinner from "./components/Spinner";
import Delayed from "./components/Delayed";
// import FileInputForm from "./features/fileInputForm/FileInputForm";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Tumbler from "./features/tumbler/Tumbler";

const statusMock = "ждем";

const currentStatus = 88;

const CurrentStatusWrapper = () => (
    <Delayed mock={statusMock} waitBeforeShow={5000}>
        <>
            <div>{currentStatus}</div>
        </>
    </Delayed>
);

const App = () => (
    <>
        <Container>
            <Spinner height={55} width={55} />

            <CurrentStatusWrapper />

            <Spinner />
            <Tumbler />

            <Paper elevation={1}>
                <h1>Form</h1>
            </Paper>

            <p>hoho</p>
        </Container>
    </>
);
export default App;
