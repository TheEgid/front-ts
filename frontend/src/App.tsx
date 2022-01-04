import React from "react";
import Container from "@material-ui/core/Container";
import Spinner from "./components/Spinner";

const App = () => (
    <>
        <Container>
            <Spinner height={55} width={55} />

            <Spinner />

            <p>hoho</p>
        </Container>
    </>
);
export default App;
