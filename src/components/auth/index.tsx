import React from "react";
import { Navigate } from "react-router-dom";
import { useCurrentApp } from "../context/app.context";

interface IProps {
    children: React.ReactNode;
}

const PrivateRoute = (props: IProps) => {
    const { isAuthenticated, isAppLoading } = useCurrentApp();

    if (isAppLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated === false) {
        return <Navigate to="/403" />;
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default PrivateRoute;
