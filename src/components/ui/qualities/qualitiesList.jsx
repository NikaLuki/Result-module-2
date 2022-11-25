import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualitiesId }) => {
    const { isLoading, getQualitie } = useQualities();
    return (
        <>
            {!isLoading
                ? qualitiesId.map((qualitieId) => {
                      const qualitie = getQualitie(qualitieId);
                      return <Qualitie key={qualitie._id} {...qualitie} />;
                  })
                : "loading ..."}
        </>
    );
};

QualitiesList.propTypes = {
    qualitiesId: PropTypes.array
};

export default QualitiesList;
