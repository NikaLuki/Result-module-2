import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavMenu from "./components/ui/navMenu";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <div>
            <AppLoader>
                <NavMenu />

                <Switch>
                    <ProtectedRoute
                        path={"/users/:userId?/:edit?"}
                        component={Users}
                    />
                    <Route path={"/login/:type?"} component={Login} />
                    <Route path={"/logout"} component={LogOut} />
                    <Route path={"/"} component={Main} />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
};

export default App;
