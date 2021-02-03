import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export function Video(props) {
    const [randomVideo, setRandomVideo] = useState(0)

    useEffect(()=>{
        axios.get(`http://localhost:8080/videos/${props.symbol}/random`)
        .then(res => setRandomVideo(res.data))
    }, [props.symbol])

    return (
        <VideoContainer className="videoContainer">
            {(randomVideo !== 0) ?
            <CustomReactPlayer url={`https://www.youtube.com/watch?v=${randomVideo.videoId}`} />
            : <div>Loading video...</div>}
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