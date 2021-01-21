import React from 'react';
import styled from 'styled-components';

export default function NewsItem(props) {
    return (
        <React.Fragment>            
            <NewsSection className ="newsSection">
                <ImageContainer>
                    <img alt={props.symbol} src={props.news.image} width="100%"></img>
                </ImageContainer>
                <NewsContent className="newsContent">
                    <Title href={props.news.url}>{props.news.headline}</Title>
                    <SourceInfo>
                        <div>By {props.news.source}</div>
                        <div>{new Date(props.news.datetime).toLocaleString()}</div>
                    </SourceInfo>
                    <p>{props.news.summary}</p>
                </NewsContent> 
            </NewsSection>

        </React.Fragment>
    )
}


const NewsSection = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 4em;
    @media (max-width: 768px){
        width: 80%;
        flex-direction: column;
    }
    `

const NewsContent = styled.div`
    width: 50%;
    @media (max-width: 768px){
        font-size: 1.2em;
        width: 100%;
        margin: 1em auto 0;
    }

`
const ImageContainer = styled.div`
    width: 35%;
    @media (max-width: 768px){
        width: 100%;
        margin:auto;
    }
`

const SourceInfo = styled.div`
    margin: 0.5em 0;
    font-style: italic
`

const Title = styled.a`
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bolder;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: black;
    &:hover{
        color:blue
    }
`