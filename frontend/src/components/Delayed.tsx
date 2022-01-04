import React from "react";

interface DelayedProps {
    mock: string;
    waitBeforeShow: number;
    children: JSX.Element;
}

const Delayed = ({ mock, waitBeforeShow, children }: DelayedProps) => {
    const [hidden, setHidden] = React.useState(true);

    React.useEffect(() => {
        const delay = setTimeout(() => setHidden(false), waitBeforeShow);
        return () => clearTimeout(delay);
    }, [waitBeforeShow]);

    return hidden ? children : <> mock </>;
};

export default Delayed;
