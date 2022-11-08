import React from "react";
import ChangeForm from "../../ui/changeForm";
import PropTypes from "prop-types";

const UserChangesPage = ({ userId }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <ChangeForm userId={userId} />
                </div>
            </div>
        </div>
    );
};

UserChangesPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserChangesPage;
