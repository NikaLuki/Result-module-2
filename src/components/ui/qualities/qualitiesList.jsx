import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualitiesId }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualitiesId.map((qualitieId) => {
                    return <Quality key={qualitieId} _id={qualitieId} />;
                })}
            </>
        );
    }
};

QualitiesList.propTypes = {
    qualitiesId: PropTypes.array
};

export default QualitiesList;
