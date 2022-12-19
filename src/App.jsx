import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavMenu from "./components/ui/navMenu";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavMenu />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route
                                path={"/users/:userId?/:edit?"}
                                component={Users}
                            />
                            <Route path={"/login/:type?"} component={Login} />
                            <Route path={"/"} component={Main} />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
