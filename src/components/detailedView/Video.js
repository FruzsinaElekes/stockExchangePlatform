import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export function Video(props) {
    const [videos, setVideos] = useState([])
    
    useEffect(()=>{
        
        if (shouldFetchVideos(props.symbol)){
            axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=25&q=${props.symbol},stock&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            .then(res => {
                console.log("fetching videos")
                sessionStorage.setItem("videos", JSON.stringify([...videos, {...res.data, symbol: props.symbol, timeStamp : Date.now()}]))
                setVideos(prev => [...prev, {...res.data, symbol: props.symbol, timeStamp : Date.now()}])
            })
        } else {
            setVideos(JSON.parse(sessionStorage.getItem("videos")).filter(v => v.symbol===props.symbol))
        }
    }, [props.symbol])

    return (
        <React.Fragment>
            {(videos.filter(v => v.symbol===props.symbol).length > 0) ? 
            <CustomReactPlayer url={`https://www.youtube.com/watch?v=${videos.filter(v => v.symbol===props.symbol)[0].items[Math.floor(Math.random()*25)].id.videoId}`} />
            : <div>Loading video...</div>}
        </React.Fragment>
    )
}

function shouldFetchVideos(symbol){
    let cachedVideos = JSON.parse(sessionStorage.getItem("videos"))
    if (cachedVideos === null) {
        return true;
    } else {
        let targetVideo = cachedVideos.filter(v => v.symbol===symbol)
        return targetVideo.length === 0 || Date.now() - targetVideo[0].timeStamp > 3600000
    }
    
}


const CustomReactPlayer = styled(ReactPlayer)`
    padding-top: 60px;
    margin: auto;
`