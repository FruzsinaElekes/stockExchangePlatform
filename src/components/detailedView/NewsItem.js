import React from 'react';
import styled from 'styled-components';

export default function NewsItem(props) {
    return (
        <div>
            <a href={props.news.url}>{props.news.headline}</a>
            <NewsSection>
                <img alt={props.symbol} src={props.news.image} width="300px"></img>
                <div>
                    <div>Source: {props.news.source}</div>
                    <div>Date: {props.news.datetime}</div>
                    <div>{props.news.summary}</div>
                </div> 
            </NewsSection>
            
            

        </div>
    )
}


const NewsSection = styled.div`
    display: flex
    `