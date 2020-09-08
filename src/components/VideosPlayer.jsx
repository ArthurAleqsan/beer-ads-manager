import React from 'react';
import { Row } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import PlayerTv from './common/PlayerTv';

const VideosPlayer = () => {
    const { tvCount } = useSelector(s => s.global, shallowEqual);
    const tvS = [];
    for (let i = 0; i < tvCount; i++) {
        tvS.push(`TV №${i + 1}`);
    }
    const playAndPause = () => {
        const videos = document.getElementsByClassName('video-frame');
        for (let i = 0; i < videos.length; i++) {
            videos[i].paused ? videos[i].play() : videos[i].pause();
        }
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
                <button className='preview-btn' onClick={playAndPause}>
                    <img src='/assets/images/icons/ellipse.svg' className='dot' />
                    <span className='text'>Предпросмотр</span>
                </button>
                <div className='video-controls-container'>
                    <div className = 'centered-row'>
                        <div className = 'control-buttons-container'>
                            <img src = '/assets/images/icons/play.svg' className = 'controls-buttons' />
                            <img src = '/assets/images/icons/pause.svg' className = 'controls-buttons' />
                            <img src = '/assets/images/icons/stop.svg' className = 'controls-buttons' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideosPlayer;
