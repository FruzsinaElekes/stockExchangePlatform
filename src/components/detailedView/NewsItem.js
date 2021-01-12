import React from 'react';
import styled from 'styled-components';

export default function NewsItem(props) {
    return (
        <div>            
            <NewsSection>
                <ImageContainer>
                    <img alt={props.symbol} src={props.news.image} width="100%"></img>
                </ImageContainer>
                <NewsContent>
                    <Title href={props.news.url}>{props.news.headline}</Title>
                    <SourceInfo>
                        <div>By {props.news.source}</div>
                        <div>{new Date(props.news.datetime).toLocaleString()}</div>
                    </SourceInfo>
                    <p>{props.news.summary}</p>
                </NewsContent> 
            </NewsSection>
            
            

        </div>
    )
}


const NewsSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 4em
    `

const NewsContent = styled.div`
    width: 50%;

`
const ImageContainer = styled.div`
    width: 25%;
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