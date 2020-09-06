import React from 'react';
import { Row } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';

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
                    return <div key={i}>{name}</div>
                })}
            </div>
        </div>
    )
};

export default VideosPlayer;
