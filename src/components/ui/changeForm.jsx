import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/profession";
import { getCurrentUserData, updateUserData } from "../../store/users";

const ChangeForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };
    useEffect(() => {
        if (!qualitiesLoading && !professionsLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [qualitiesLoading, professionsLoading, currentUser, data]);
    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "?????????????? ??????"
            }
        },

        email: {
            isRequired: {
                message: "?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "Email ???????????? ??????????????????????"
            }
        },
        profession: {
            isRequired: {
                message: "?????????????????????? ???????????????? ???????? ??????????????????"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(updateUserData(newData));
    };

    return !isLoading ? (
        <form onSubmit={handleSubmit}>
            <TextField
                label="??????"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="?????????????????????? ??????????"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                label="???????????? ???????? ??????????????????"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="???????????????? ?????? ??????"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="???????????????? ???????? ????????????????"
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    ) : (
        "Loading"
    );
};

ChangeForm.propTypes = {
    userId: PropTypes.string.isRequired
};

export default ChangeForm;
