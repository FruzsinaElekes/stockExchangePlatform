import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

export default function AboutPage() {

    const [about, setAbout] = useState("")
    const aboutRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_ABOUT_ROUTE + process.env.REACT_APP_LANGUAGE

    useEffect(() => {
        fetch(aboutRoute)
        .then(resp => resp.json())
        .then(data => setAbout(data.details))
    }, [about])

    return (
        <AboutContainer>{about}</AboutContainer>
    )
}


const AboutContainer = styled(ReactMarkdown)`
    width: min(80%, 900px);
    margin: 4em auto;
    line-height: 1.5em;
`