import React from 'react';
import PropTypes from 'prop-types';
import RemoveBtn from './RemoveBtn';

const MediaContainer = ({ isImg, file }) => {
    const { url, name, id } = file;
    const handleRemove = () => {
        console.log('removed' + id);
    };

    return (
        <div className='media-file-container'>
            {isImg
                ? <img src={url} className='content-media' />
                : <div className='video-container'>
                    <img src={url} className='content-media' />
                    <div className='video-bottom-container'>
                        <img src='/assets/images/icons/player.svg' />
                        <span>00.10.00</span>
                    </div>
                </div>
            }
            <RemoveBtn handleRemove={handleRemove} />
            <div className='media-name-container'>{name}</div>
        </div>
    )
};
MediaContainer.propTypes = {
    isImg: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
};
export default MediaContainer;
