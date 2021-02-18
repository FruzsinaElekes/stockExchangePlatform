import React, { useState, useRef, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { TextField, Button, Checkbox, Typography, FormControlLabel, Modal } from "@material-ui/core";

export default function RegistrationForm(props) {
    const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(true)
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [message, setMessage] = useState("")
    const messageOpen = () => setOpen(true)
    const messageClose = () => setOpen(false)
    
    const registerFirstName = useRef()
    const registerLastName = useRef()
    const registerEmail = useRef()
    const registerPassword = useRef()
    const registerPasswordRepeat = useRef()
    const registerTermsCheckbox = useRef()
    const [validEmailFeedback, setValidEmail] = useState(true)
    const [validFirstNameFeedback, setValidFirstName] = useState(true)
    const [validLastNameFeedback, setValidLastName] = useState(true)
    const [validPasswordFeedback, setValidPassword,] = useState(true)

    const messages = {
        invalidInput: "Invalid data provided! Please check your inputs!",
        serverError: "Server could not complete the registration! Please try again later!",
        userExists: "Username already taken!"
    }

    const handleRegister = () => {

        if (!validFormData()) {
            alert(messages.invalidInput)
            return
        }

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
                if (response.success === true) {
                    setRedirect(true)
                }
                else {
                    setMessage(messages.serverError)
                    messageOpen()
                }
            })
            .catch(err => console.log(err))
    }

    const handleBadRequest = (response) => {
        if (!response.ok) {
            if (response.status === 409) {
                setMessage(messages.userExists)
                messageOpen()
                throw Error(message)
            }
            throw Error(response.statusText)
        }
        else {
            return response
        }
    }

    const emailIsValid = () => {
        const email = registerEmail.current.value;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const fieldIsValid = (text) => {
        return text.length !== 0;
    }

    const passwordIsValid = () => {
        const password1 = registerPassword.current.value;
        const password2 = registerPasswordRepeat.current.value;
        if (!fieldIsValid(password1)) {
            return false
        }
        else {
            return password1 === password2;
        }
    }

    const validFormData = () => {
        return fieldIsValid(registerFirstName.current.value) &&
               fieldIsValid(registerLastName.current.value) &&
               emailIsValid() &&
               passwordIsValid()
    }

    return(
    <StyledDiv>
        {redirect === true ? <Redirect to="/login" /> : <></>}
        <Modal open={open} onClose={messageClose}><ModalContent>{message}</ModalContent></Modal>
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
            error={!validFirstNameFeedback}
            onChange={ ()=> setValidFirstName(fieldIsValid(registerFirstName.current.value)) }
            helperText={validFirstNameFeedback ? "" : "Invalid first name"}
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
            error={!validLastNameFeedback}
            onChange={ ()=> setValidLastName(fieldIsValid(registerLastName.current.value)) }
            helperText={validLastNameFeedback ? "" : "Invalid last name"}
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
            error={!validEmailFeedback}
            onChange={ ()=> setValidEmail(emailIsValid()) }
            helperText={validEmailFeedback ? "" : "Invalid email"}
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
            error={!validPasswordFeedback}
            onChange={ ()=> setValidPassword(passwordIsValid()) }
            helperText={validPasswordFeedback ? "" : "Invalid password input"}
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
            error={!validPasswordFeedback}
            onChange={ ()=> setValidPassword(passwordIsValid()) }
            helperText={validPasswordFeedback ? "" : "Invalid password input"}
        />
        <FormControlLabel
            style={{ marginRight: 0 }}
            control={
            <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={event => {
                setHasTermsOfServiceError(!event.target.checked)
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
          disabled={hasTermsOfServiceError}
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