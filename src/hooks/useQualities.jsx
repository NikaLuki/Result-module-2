import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import qualitiesService from "../services/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualities();
    }, []);

    useEffect(() => {
        if (!error) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getQualities() {
        try {
            const { content } = await qualitiesService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getQualitie(id) {
        return qualities.find((q) => q._id === id);
    }

    function errorCatcher(error) {
        const message = error.response.data;
        setError(message);
        setLoading(false);
    }
    return (
        <QualitiesContext.Provider
            value={{ qualities, isLoading, getQualitie }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualitiesProvider;
