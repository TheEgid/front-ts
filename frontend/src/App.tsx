import React from "react";
import "./custom.scss";
import Spinner from "./components/Spinner";
import Delayed from "./components/Delayed";
// import FileInputForm from "./features/fileInputForm/FileInputForm";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Tumbler from "./features/tumbler/Tumbler";
import { useSelector } from "react-redux";
import { selectRowQuantity } from "./features/tumbler/tumblerSlice";
import FileInputForm from "./features/fileInputForm/FileInputForm";

const statusMock = "ждем";

const CurrentStatusWrapper = () => {
    const tumblerRowAmount = useSelector(selectRowQuantity);
    return (
        <Delayed mock={statusMock} waitBeforeShow={5000}>
            <>
                <div>{tumblerRowAmount}</div>
            </>
        </Delayed>
    );
};

const App = () => (
    <>
        <Container>
            <Spinner height={55} width={55} />

            <CurrentStatusWrapper />

            <Spinner />
            <Tumbler />
            <FileInputForm />

            <Paper elevation={1}>
                <h1>Form</h1>
            </Paper>

            <p>hoho</p>
        </Container>
    </>
);
export default App;
