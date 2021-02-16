import React, { useState, useRef, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';

export default function RegistrationForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState("");
    const errorOpen = () => setOpen(true);
    const errorClose = () => setOpen(false);
    const registerFirstName = useRef();
    const registerLastName = useRef();
    const registerEmail = useRef();
    const registerPassword = useRef();
    const registerPasswordRepeat = useRef();
    const registerTermsCheckbox = useRef();

    const handleRegister = () => {
        const body = {
            firstName: registerFirstName.current.value,
            lastName: registerLastName.current.value,
            username: registerEmail.current.value,
            password: registerPassword.current.value
        }
        fetch("http://localhost:8080/register", {
                method: "post",
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            })
            .then(handleBadRequest)
            .then(resp => resp.json())
            .then(response => {
                console.log(response.statusText)
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
            label="First Name"
            autoFocus
            inputRef={registerFirstName}
            autoComplete="off"
            type="text"
            FormHelperTextProps={{ error: true }}
        />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            autoFocus
            inputRef={registerLastName}
            autoComplete="off"
            type="text"
            FormHelperTextProps={{ error: true }}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            inputRef={registerEmail}
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
            inputRef={registerPassword}
            autoComplete="off"
            FormHelperTextProps={{ error: true }}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Repeat Password"
            type="password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            FormHelperTextProps={{ error: true }}
        />
        <FormControlLabel
            style={{ marginRight: 0 }}
            control={
            <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                setHasTermsOfServiceError(false);
                }}
            />
            }
            label={
            <Typography variant="body1">
                I agree to the
                <span
    
                tabIndex={0}
                role="button"
                >
                {" "}
                terms of service
                </span>
            </Typography>
            }
        />
        </Fragment>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleRegister}
          disabled={isLoading}
        >
          Register
        </Button>
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