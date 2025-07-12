import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AuthFormError, Button, Content, Input } from "@components"
import { Link, Navigate } from "react-router-dom"
import { setUser } from "@actions"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@selectors"
import { ROLE } from "@constants"
import { useResetForm } from "@hooks"
import { useState } from "react"
import styled from "styled-components"
import { request } from "../../utils/request.js"

const regFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Enter the login")
        .matches(
            /^\w+$/,
            "The login is incorrectly introduced. Only Latin letters and numbers are allowed",
        )
        .min(3, "The login is incorrectly entered. At least 3 characters")
        .max(15, "The login is incorrectly introduced. Maximum 15 characters"),
    password: yup
        .string()
        .required("Enter the password")
        .matches(
            /^[\w#%]+$/,
            "The password is incorrectly entered. Only Latin letters, numbers and signs # % are allowed",
        )
        .min(6, "The password is incorrectly entered. At least 6 characters")
        .max(25, "The password is incorrectly entered. Maximum 25 characters"),
    passcheck: yup
        .string()
        .required("Enter the password again")
        .oneOf([yup.ref("password"), null], "Passwords do not match"),
})

const imageMan = "/man.jpg"

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 12px 0;
    font-size: 18px;

    &:hover {
        color: #ea454c;
    }
`

const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            passcheck: "",
        },
        resolver: yupResolver(regFormSchema),
    })

    const [serverError, setServerError] = useState(null)
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    useResetForm(reset)

    const onSubmit = ({ login, password }) => {
        request("/register", "POST", { login, password }).then(
            ({ error, user }) => {
                if (error) {
                    setServerError(`Request error: ${error}`)
                    return
                }
                dispatch(setUser(user))
                sessionStorage.setItem("userData", JSON.stringify(user))
            },
        )
    }

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.passcheck?.message
    const errorMessage = formError || serverError

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />
    }

    return (
        <Content>
            <div className={className}>
                <h1>Register</h1>
                <div className="title-text">
                    Hello! Please enter your details.
                </div>
                <form name="reg-form" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="login"
                        name="login"
                        placeholder="Login..."
                        {...register("login", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password..."
                        {...register("password", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <Input
                        type="password"
                        name="passcheck"
                        placeholder="Repeat password..."
                        {...register("passcheck", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <Button type="submit" disabled={!!formError}>
                        Register
                    </Button>
                    {errorMessage && (
                        <AuthFormError>{errorMessage}</AuthFormError>
                    )}
                    <StyledLink to="/login">Return to Join</StyledLink>
                </form>
            </div>
            <img src={imageMan} alt="Man" />
        </Content>
    )
}

export const Registration = styled(RegistrationContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title-text {
        margin: 8px 0;
        width: 324px;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 260px;
        margin-top: 8px;
    }
`
