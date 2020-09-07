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

            </div>
        </div>
    )
};

export default VideosPlayer;
