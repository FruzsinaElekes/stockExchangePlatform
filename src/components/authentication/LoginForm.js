import React, { useContext, useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';


export default function LoginForm(props) {
    let [userData, setUserData] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const errorOpen = () => setOpen(true);
    const errorClose = () => setOpen(false);
    const loginEmail = useRef();
    const loginPassword = useRef();
    
    const handleLogin = () => {
        const body = {
            username: loginEmail.current.value,
            password: loginPassword.current.value
        }
        fetch("http://localhost:8080/login", {
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
                setError("Invalid username or password!")
                errorOpen()
                throw Error(error)
            }
            throw Error(response.statusText)
        }
        else {
            return response
        }
    }

    return(
    <StyledDiv>
        {redirect === true ? <Redirect to="/" /> : <></>}
        <Modal open={open} onClose={errorClose}><ModalContent>{error}</ModalContent></Modal>
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
            FormHelperTextProps={{ error: true }}
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
            onChange={() => {
            }}
            FormHelperTextProps={{ error: true }}
        />
        <FormControlLabel
            control={<Checkbox color="primary" />}
            label={<Typography variant="body1">Remember me</Typography>}
        />
        </Fragment>
        <Fragment>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={isLoading}
            size="large"
            onClick={handleLogin}
        >
            Login
            {isLoading && <div />}
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
