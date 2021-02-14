import React, { useState, useRef, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@material-ui/core";

export default function RegistrationForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const registerTermsCheckbox = useRef();
    const registerPassword = useRef();
    const registerPasswordRepeat = useRef();

    return(
    <StyledDiv>
        <Fragment>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            autoComplete="off"
            type="email"
            onChange={() => {
            }}
            FormHelperTextProps={{ error: true }}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            inputRef={registerPassword}
            autoComplete="off"
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Repeat Password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
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
