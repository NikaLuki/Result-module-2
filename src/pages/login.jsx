import React, { useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErorrs] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Некорректная электронная почта"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            min: {
                value: 8,
                message: `Пароль должен состоять как минимум из 8 символов`
            },
            isCapitalSymbol: {
                message: "Пароль должен как минимум одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен как минимум одну цифру"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErorrs(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    const handleChange = ({ target }) => {
        const { value, name } = target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            label="Электронная почта"
                            error={errors.email}
                        />
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            label="Пароль"
                            error={errors.password}
                        />
                        <button
                            disabled={!isValid}
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
