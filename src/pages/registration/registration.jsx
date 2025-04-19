import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {server} from "../../bff"
import styled from "styled-components"
import {AuthFormError, Button, Content, H2, Input} from "../../components"
import {Link, Navigate} from "react-router-dom"
import {setUser} from "../../actions"
import {useDispatch, useSelector} from "react-redux"
import {selectUserRole} from "../../selectors"
import {ROLE} from "../../constants"
import {useResetForm} from "../../hooks"
import {useState} from "react"

const regFormSchema = yup.object().shape({
    login: yup.string()
        .required("Введите логин")
        .matches(/^\w+$/, "Неверно введен логин. Допускаются только латинские буквы и цифры ")
        .min(3, "Неверно введен логин.Минимум 3 символа ")
        .max(15, "Неверно  введен  логин . Максимум 15 символов "),
    password: yup.string().required("Введите пароль")
        .matches(/^[\w#%]+$/, "Неверно введен пароль. Допускаются только латинские буквы, цифры и знаки # %")
        .min(6, "Неверно введен пароль.Минимум 6 символа ")
        .max(25, "Неверно введен пароль. Максимум 25 символов"),
    passcheck: yup.string()
        .required("Введите пароль повторно")
        .oneOf([yup.ref("password"), null], "Пароли не cовпадают"),
})

const imageMan = "/man.jpg"

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 12px 0;
    font-size: 18px;

    &:hover {
        color: #EA454C;
    }
`

const ImageContainer = styled.div`
    padding-top: 5px;
    width: 510px;
`

const RegistrationContainer = ({className}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
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

    const roleID = useSelector(selectUserRole)

    useResetForm(reset)

    const onSubmit = ({login, password}) => {
        server.register(login, password).then(({error, res}) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`)
                return
            }
            dispatch(setUser(res))
            sessionStorage.setItem("userData", JSON.stringify(res))
        })
    }

    const formError =
        errors?.login?.message || errors?.password?.message ||
        errors?.passcheck?.message
    const errorMessage = formError || serverError

    if (roleID !== ROLE.GUEST) {
        return <Navigate to="/"/>
    }

    return (
        <Content>
            <div className={className}>
                <H2>Register</H2>
                <div className="title-text">Hello! Please enter your details.</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="login" placeholder="Логин..." {...register("login", {
                        onChange: () => setServerError(null),
                    })}/>
                    <Input type="password"
                           placeholder="Пароль..."  {...register("password", {
                        onChange: () => setServerError(null),
                    })}/>
                    <Input type="password"
                           placeholder="Повторите пароль..." {...register("passcheck", {
                        onChange: () => setServerError(null),
                    })}/>
                    <Button type="submit" disabled={!!formError}>Зарегистрироваться
                    </Button>
                    {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
                    <StyledLink to="/login">Вернуться к Авторизации</StyledLink>
                </form>
            </div>
            <ImageContainer>
                <img src={imageMan} alt="Man"/>
            </ImageContainer>
        </Content>
    )
}

export const Registration = styled(RegistrationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & .title-text {
        margin: 8px 0;
    }

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
        margin-top: 8px;
    }
`
