import React from "react";
import NavMenu from "./components/navMenu";
import Users from "./pages/users";
import { Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";

const App = () => {
    return (
        <>
            <NavMenu />
            <Switch>
                <Route path={"/users/:userId?"} component={Users} />
                <Route path={"/login"} component={Login} />
                <Route path={"/"} component={Main} />
            </Switch>
        </>
    );
};

export default App;
