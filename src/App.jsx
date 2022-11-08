import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavMenu from "./components/ui/navMenu";

const App = () => {
    return (
        <>
            <NavMenu />
            <Switch>
                <Route path={"/users/:userId?/:edit?"} component={Users} />
                <Route path={"/login/:type?"} component={Login} />
                <Route path={"/"} component={Main} />
            </Switch>
        </>
    );
};

export default App;
