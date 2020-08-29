import React from 'react';
import PropTypes from 'prop-types';

const MediaContainer = ({ isImg, file }) => {
    const { url, name, id } = file;
    const handleRemove = () => {
        console.log('removed' + id);
    };

    return (
        <div className='media-file-container'>
            {isImg
                ? <img src={url} className = 'content-media' />
                : <div></div>
            }
            <div className='remove-btn-container'>
                <img src='/assets/images/icons/bin.svg' onClick={handleRemove} className = 'remove-icon' />
            </div>
            <div className='media-name-container'>{name}</div>
        </div>
    )
};
MediaContainer.propTypes = {
    isImg: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
};
export default MediaContainer;
