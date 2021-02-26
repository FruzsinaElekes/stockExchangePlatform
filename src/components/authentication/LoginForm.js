import React, { useContext, useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { TextField, Button, Typography, Modal } from "@material-ui/core";
import styled from 'styled-components';


export default function LoginForm(props) {
    const setUserData = useContext(UserContext)[1]
    const [redirect, setRedirect] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const messageOpen = () => setOpen(true)
    const messageClose = () => setOpen(false)
    const loginEmail = useRef()
    const loginPassword = useRef()
    const [validEmailFeedback, setValidEmail] = useState(true)
    const [validPasswordFeedback, setValidPassword,] = useState(true)
    const [emailCharByChar, setEmailCharByChar] = useState(false)
    const [anyEmpty, setAnyEmpty] = useState(true)
    const loginRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_LOGIN_ROUTE
    const portfolioRoute = process.env.REACT_APP_PORTFOLIO_PAGE


    const messages = {
        invalidUser: "Invalid username or password!"
    }

    const handleLogin = () => {
        
        if (!validateInput()) return    

        const body = {
            username: loginEmail.current.value,
            password: loginPassword.current.value
        }
        fetch(loginRoute, {
                method: "post",
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            })
            .then(handleBadRequest)
            .then(resp => resp.json())
            .then(response => {
                setUserData({
                    loggedIn: true,
                    username: response.username
                })
                document.cookie = `access_token=${response.token}`
                setRedirect(true)
            })
            .catch(err => console.log(err))
    }

    const handleBadRequest = (response) => {
        if (!response.ok) {
            if (response.status === 403) {
                setMessage(messages.invalidUser)
                messageOpen()
                throw Error(message)
            }
            throw Error(response.statusText)
        }
        else {
            return response
        }
    }

    const emailIsValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.current.value)
    const passwordIsValid = () => loginPassword.current.value.length !== 0
    const isAnyEmpty = () => loginPassword.current.value.length === 0 || loginEmail.current.value.length === 0

    const validateInput = () => {
        setEmailCharByChar(true)
        setValidEmail(emailIsValid())
        setValidPassword(passwordIsValid())
        return emailIsValid() && passwordIsValid()
    }

    return(
    <StyledDiv>
        {redirect && <Redirect to={portfolioRoute} />}
        <Modal open={open} onClose={messageClose}><ModalContent>{message}</ModalContent></Modal>
        <Fragment>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            inputRef={loginEmail}
            autoFocus
            autoComplete="off"
            type="email"
            error={!validEmailFeedback}
            onChange={ () => { 
                setAnyEmpty(isAnyEmpty())
                if (emailCharByChar) setValidEmail(emailIsValid())
            }}
            helperText={validEmailFeedback ? "" : "Invalid email"}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            inputRef={loginPassword}
            autoComplete="off"
            error={!validPasswordFeedback}
            onChange={ () => {
                setAnyEmpty(isAnyEmpty())
                setValidPassword(passwordIsValid())
            }}
            helperText={validPasswordFeedback ? "" : "Invalid password input"}
        />
        </Fragment>
        <Fragment>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={anyEmpty}
            size="large"
            onClick={handleLogin}
        >
            Login
        </Button>
        <Typography
            align="center"
            color="primary"
            tabIndex={0}
            role="button"
        >
            Forgot Password?
        </Typography>
        </Fragment>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
    margin: auto auto;
    width: 400px;
`

const ModalContent = styled.div`
    padding: 2em;
    background-color:white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
