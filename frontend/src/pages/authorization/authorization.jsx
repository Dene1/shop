import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { AuthFormError, Button, Content, Input } from "@components"
import { Link, Navigate } from "react-router-dom"
import { setUser } from "@actions"
import { useDispatch, useSelector } from "react-redux"
import { selectUserRole } from "@selectors"
import { ROLE } from "@constants"
import { useResetForm } from "@hooks"
import styled from "styled-components"
import { request } from "../../utils/request.js"

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Введите логин")
        .matches(
            /^\w+$/,
            "Неверно введен логин. Допускаются только латинские буквы, цифры",
        )
        .min(3, "Неверно введен логин. Минимум 3 символа")
        .max(15, "Неверно введен логин. Максимум 15 символов"),

    password: yup
        .string()
        .required("Введите пароль")
        .matches(
            /^[\w#%]+$/,
            "Неверно введен пароль. Допускаются только латинские буквы, цифры и знаки # %",
        )
        .min(6, "Неверно введен пароль. Минимум 6 символа")
        .max(25, "Неверно введен пароль. Максимум 25 символов"),
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

const AuthorizationContainer = ({ className }) => {
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
        console.log(login, password)
        request("/login", "POST", { login, password }).then(
            ({ error, user }) => {
                if (error) {
                    setServerError(`Ошибка запроса: ${error}`)
                    return
                }
                console.log(user)

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
            <div className={className}>
                <div className="title">Welcome back</div>
                <div className="title-text">
                    Welcome back! <br /> Please enter your details.
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="login"
                        placeholder="Логин..."
                        {...register("login", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <Input
                        type="password"
                        placeholder="Пароль..."
                        {...register("password", {
                            onChange: () => setServerError(null),
                        })}
                    />
                    <Button type="submit" disabled={!!formError}>
                        Авторизоваться
                    </Button>
                    {errorMessage && (
                        <AuthFormError>{errorMessage}</AuthFormError>
                    )}
                    <StyledLink to="/register">Регистрация</StyledLink>
                </form>
            </div>
            <img src={imageMan} alt="Man" />
        </Content>
    )
}

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .title {
        margin-top: 12px;
        font-size: 40px;
        text-transform: uppercase;
    }

    & .title-text {
        margin: 8px 0;
        text-align: center;
    }

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
        margin-top: 20px;
    }
`
