import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ _id }) => {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(_id);
    return <span className={"badge bg-" + color + " m-1"}>{name}</span>;
};
Quality.propTypes = {
    _id: PropTypes.string
};
export default Quality;
