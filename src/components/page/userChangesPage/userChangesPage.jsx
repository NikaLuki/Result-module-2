import React from "react";
import ChangeForm from "../../ui/changeForm";
import { useParams } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";

const UserChangesPage = () => {
    const { userId } = useParams();
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <ChangeForm userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default UserChangesPage;
