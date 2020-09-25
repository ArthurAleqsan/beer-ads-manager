import React, { useLayoutEffect, useState } from 'react';
import { Row } from 'antd';
import { useSelector, shallowEqual, useDispatch, useStore } from 'react-redux';
import PlayerTv from './common/PlayerTv';
import { getTimeValuefromDuration } from '../util/helpers';
import { generateVideo } from '../store/global/global.actions';
import { ASSETS_PATH } from '../util/conf';

const VideosPlayer = () => {
    const { tvCount, generatedVideo } = useSelector(s => s.global, shallowEqual);
    const duration = generatedVideo?.duration;
    const rows = generatedVideo?.rows;

    const [selectedRow, setSelectedRow] = useState(0);

    const tvS = [];
    const dispatch = useDispatch();
    const { getState } = useStore();
    for (let i = 0; i < tvCount; i++) {
        tvS.push(`TV №${i + 1}`);
    }
    const [videos, setVideos] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeWidth, setActiveWidth] = useState(0);
    useLayoutEffect(() => {
        const _videos = document.getElementsByClassName('video-frame');
        setVideos(_videos);
        setVideoDuration(_videos[0].duration);
        if (videos && videos[0].currentTime > 2) {
            clearInterval(timer);
        }
    });
    // function clickedBar(e){
    //     if(!myMovie.paused && !myMovie.ended){
    //         var mouseX=e.pageX-bar.offsetLeft;
    //         var newtime=mouseX*myMovie.duration/barSize;
    //         myMovie.currentTime=newtime;
    //         progressBar.style.width=mouseX+'px';
    //     }
    // }
    const timer = () => {
        const c_t = Math.ceil(videos[0].currentTime);
        const dur = videos[0].duration;
        setActiveWidth(c_t / dur * 100 + '%');
        setCurrentTime(c_t);
    }
    const setVideoCurrentTime = () => {
        setInterval(timer, 1000);
    }
    const play = () => {
        setIsPlaying(true);

        for (let i = 0; i < videos.length; i++) {
            videos[i].play();
        }
        setVideoCurrentTime()
    };

    const pause_stop = (fromStop) => {
        for (let i = 0; i < videos.length; i++) {
            videos[i].pause();
            if (fromStop) {
                videos[i].currentTime = 0;
            }
        }
        setIsPlaying(false);
    };
    let status = false;
    const handleGenerate = () => {
        generateVideo(dispatch, getState);
        // status = true;
        // saveVideo(dispatch, getState);
    };
    if(rows) {
        console.log(23456);
        console.log(rows);
        // for(let i = 0; i < rows.length; i++) {
        //     setTimeout(() => {
        //         console.log(rows[i + 1]);
        //         setSelectedRow(i + 1)
        //     }, 1000);
        // }
        status = false; 
    }


    return (
        <div className='videos-player'>
            <div className='videos-player-header'>
                <span>Видео без названия</span>
            </div>
            <div className='videos-player-container'>
                {tvS.map((name, i) => {
                    return <PlayerTv
                        key={i}
                        count={tvCount}
                        name={name}
                        id={i + 1}
                        media={rows && rows[selectedRow] && rows[selectedRow].tv_s[i]}
                    />
                })}
            </div>
            <div className='video-controls-container'>
                <button className='preview-btn' onClick={handleGenerate}>
                    <img src={`${ASSETS_PATH}/images/icons/ellipse.svg`} className='dot' />
                    <span className='text'>Предпросмотр</span>
                </button>
                <div className='video-controls-container'>
                    <div className='centered-row'>
                        <div className='control-buttons-container'>
                            <img src={`${ASSETS_PATH}/images/icons/play.svg`} className='controls-buttons' onClick={play} />
                            <img src={`${ASSETS_PATH}/images/icons/pause.svg`} className='controls-buttons' onClick={() => pause_stop(false)} />
                            {isPlaying ? <div className='controls-buttons active-btn' onClick={() => pause_stop(true)}></div> : <img src={`${ASSETS_PATH}/images/icons/stop.svg`}
                                className='controls-buttons'
                            />}
                        </div>
                        <div className='timeline'>
                            <div className='active-bar' style={{ width: activeWidth }}></div>
                            <div className='active-scroller' style={{ marginLeft: activeWidth }}></div>
                        </div>
                        <div className='duration-container'>
                            <span>{getTimeValuefromDuration(currentTime)}</span>
                            <span className='divider'>/</span>
                            <span>{duration || getTimeValuefromDuration(0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideosPlayer;
