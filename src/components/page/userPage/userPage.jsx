import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments/";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import { useUser } from "../../../hooks/useUsers";

const UserPage = ({ userId }) => {
    const { getUser } = useUser();
    const user = getUser(userId);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard {...user} />
                        <QualitiesCard qualitiesId={user.qualities} />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
