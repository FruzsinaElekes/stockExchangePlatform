import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function Video(props) {

    const [videos, setVideos] = useState(null)    
    
    useEffect(()=>{
        let cachedVideos = localStorage.getItem(props.symbol + "_videos")
        if (cachedVideos){
            setVideos(JSON.parse(cachedVideos))
        } else {
            axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=25&q=${props.symbol}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            .then(res => {
                localStorage.setItem(props.symbol + "_videos", JSON.stringify(res.data))
                setVideos(res.data)
            })
        }
    }, [])

    return (
        <React.Fragment>
            {videos &&
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videos.items[Math.floor(Math.random()*videos.items.length)].id.videoId}`} />
            }
        </React.Fragment>
    )
}
