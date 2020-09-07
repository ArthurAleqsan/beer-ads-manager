import React from 'react';
import PropTypes from 'prop-types';

const PlayerTv = ({ count, name, id }) => {
    let body
    switch (count) {
        case 1:
            body = <div className='single-tv-player-container'>
                <div className='single-tv-player'>
                    <iframe className='video-frame' src="https://www.w3schools.com" />
                </div>
            </div>
            break;
        case 2:
            body = <div className='tv-player-container'>
                <div className='tv-player'>
                    <iframe className='video-frame' src="https://www.w3schools.com" />
                    <div className='name-container'>
                        <span>{name}</span>
                    </div>
                </div>
            </div>
            break;
        case 3:
            body = <div className={`tv-player-container small-containers container-${id}`}>
                <div className='tv-player'>
                    <iframe className='video-frame' src="https://www.w3schools.com" />
                    <div className='name-container'>
                        <span>{name}</span>
                    </div>
                </div>
            </div>
            break;
    }
    return body
};
PlayerTv.propTypes = {
    count: PropTypes.number.isRequired,
};
export default PlayerTv;
