import React, { useContext, useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import styled from 'styled-components';
import axios from 'axios';


export default function LoginForm(props) {
    let [userData, setUserData] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const loginEmail = useRef();
    const loginPassword = useRef();

    const handleLogin = () => {
        axios.post("http://localhost:8080/login", {
                username: "test@email.hu",
                password: "safe"
            })
            .then(response => {
                document.cookie = `access_token=${response.data.token}`
                setUserData({
                    loggedIn: true,
                    username: response.data.username
                })
                console.log(userData)
            })
            .then(console.log(document.cookie))
    }

    return(
    <StyledDiv>
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
