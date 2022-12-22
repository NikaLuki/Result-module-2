import React, { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <div>LogOut</div>;
};

export default LogOut;
