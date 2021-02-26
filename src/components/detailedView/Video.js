import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export function Video(props) {
    let random = Math.floor(Math.random() * props.videos.length);

    return (
        <VideoContainer className="videoContainer">
            <CustomReactPlayer url={`http://www.youtube.com/watch?v=${props.videos[random].videoId}`}/>
        </VideoContainer>
    )
}

const VideoContainer = styled.div`
    margin: 4em auto 2em;
    width: 100%;
`


const CustomReactPlayer = styled(ReactPlayer)`
    /* padding-top: 60px; */
    margin: auto;
`