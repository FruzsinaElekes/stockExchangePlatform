import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

export default function AboutPage() {

    const [about, setAbout] = useState("")

    useEffect(() => {
        fetch("http://localhost:8080/about/en")
        .then(resp => resp.json())
        .then(data => setAbout(data.details))
    }, [about])

    return (
        <AboutContainer>{about}</AboutContainer>
    )
}


const AboutContainer = styled(ReactMarkdown)`
    max-width: 900px;
    margin: 4em auto;
    line-height: 1.5em;
`