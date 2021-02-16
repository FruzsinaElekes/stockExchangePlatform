import React, { useContext, useState, useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import styled from 'styled-components';


export default function LoginForm(props) {
    let [userData, setUserData] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
            .then(resp => resp.json())
            .then(response => {
                setUserData({
                    loggedIn: true,
                    username: response.username
                })
                document.cookie = `access_token=${response.token}`
                setRedirect(true)
            })
            .catch(error => console.log(error))
    }

    return(
    <StyledDiv>
        {redirect === true ? <Redirect to="/" /> : <></>} 
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
