import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { AuthFormError, Button, Content, Input } from "@/components"
import { Link, Navigate } from "react-router-dom"
import { setUser } from "@/actions"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@/selectors"
import { ROLE } from "@/constants"
import { useResetForm } from "@/hooks"
import styled from "styled-components"
import { request } from "@//utils/request"
import { AuthorizationContainer } from "@/pages/authorization/authorization.styles"

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Enter the login")
        .matches(
            /^\w+$/,
            "The login is incorrectly introduced. Only Latin letters, numbers are allowed",
        )
        .min(3, "The login is incorrectly introduced. At least 3 characters")
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
})

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 16px 0;
    font-size: 18px;

    &:hover {
        color: #ea454c;
    }
`
const imageMan = "/man.jpg"

export const Authorization = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    })

    const [serverError, setServerError] = useState(null)
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    useResetForm(reset)

    const onSubmit = ({ login, password }) => {
        request("/login", "POST", { login, password }).then(
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

    const formError = errors?.login?.message || errors?.password?.message
    const errorMessage = formError || serverError

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />
    }

    return (
        <Content>
            <AuthorizationContainer>
                <div className="title">Welcome back</div>
                <div className="title-text">
                    Welcome back! <br /> Please enter your details.
                </div>
                <form name="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" disabled={!!formError}>
                        Sign in
                    </Button>
                    {errorMessage && (
                        <AuthFormError>{errorMessage}</AuthFormError>
                    )}
                    <StyledLink to="/register">Register</StyledLink>
                </form>
            </AuthorizationContainer>
            <img src={imageMan} alt="Man" />
        </Content>
    )
}
