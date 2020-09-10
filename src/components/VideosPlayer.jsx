import React, { useLayoutEffect, useState } from 'react';
import { Row } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import PlayerTv from './common/PlayerTv';
import { getTimeValuefromDuration } from '../util/helpers';

const VideosPlayer = () => {
    const { tvCount } = useSelector(s => s.global, shallowEqual);
    const tvS = [];
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


    return (
        <div className='videos-player'>
            <div className='videos-player-header'>
                <span>Видео без названия</span>
            </div>
            <div className='videos-player-container'>
                {tvS.map((name, i) => {
                    return <PlayerTv key={i} count={tvCount} name={name} id={i + 1} />
                })}
            </div>
            <div className='video-controls-container'>
                <button className='preview-btn' onClick={() => console.log('object')}>
                    <img src='/assets/images/icons/ellipse.svg' className='dot' />
                    <span className='text'>Предпросмотр</span>
                </button>
                <div className='video-controls-container'>
                    <div className='centered-row'>
                        <div className='control-buttons-container'>
                            <img src='/assets/images/icons/play.svg' className='controls-buttons' onClick={play} />
                            <img src='/assets/images/icons/pause.svg' className='controls-buttons' onClick={() => pause_stop(false)} />
                            {isPlaying ? <div className='controls-buttons active-btn' onClick={() => pause_stop(true)}></div> : <img src='/assets/images/icons/stop.svg'
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
                            <span>{getTimeValuefromDuration(20)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideosPlayer;
