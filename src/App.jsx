import React, { useEffect } from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavMenu from "./components/ui/navMenu";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <>
            <AuthProvider>
                <NavMenu />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <ProtectedRoute
                                path={"/users/:userId?/:edit?"}
                                component={Users}
                            />
                            <Route path={"/login/:type?"} component={Login} />
                            <Route path={"/logout"} component={LogOut} />
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
