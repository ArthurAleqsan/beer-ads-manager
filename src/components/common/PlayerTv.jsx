import React from 'react';
import PropTypes from 'prop-types';

const PlayerTv = ({ count, name, id }) => {
    let body
    switch (count) {
        case 1:
            body = <div className='single-tv-player-container'>
                <div className='single-tv-player'>
                    <video>
                        <source src='/assets/images/fake/v.mp4' />
                    </video>
                </div>
            </div>
            break;
        case 2:
            body = <div className='tv-player-container'>
                <div className='tv-player'>
                    <video className = 'video-frame'>
                        <source src='/assets/images/fake/v.mp4' />
                    </video>
                    <div className='name-container'>
                        <span>{name}</span>
                    </div>
                </div>
            </div>
            break;
        case 3:
            body = <div className={`tv-player-container small-containers container-${id}`}>
                <div className='tv-player'>
                    <video>
                        <source src='/assets/images/fake/v.mp4' />
                    </video>
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
