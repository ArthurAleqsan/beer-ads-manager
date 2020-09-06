import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RemoveBtn from './RemoveBtn';
import RemoveItemPopup from '../popups/RemoveItemPopup';

const MediaContainer = ({ isImg, file }) => {
    const { url, name, id } = file;
    const [visibility, setVisibility] = useState(false);
    const handleRemove = () => {
        console.log('removed' + id);
    };
    const openRemoveModal = () => {
        setVisibility(true);
    };
    const closeRemoveModal = () => {
        setVisibility(false);
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
            <RemoveBtn handleRemove={openRemoveModal} />
            <div className='media-name-container'>{name}</div>
            <RemoveItemPopup
                visible={visibility}
                handleCancel={closeRemoveModal}
                handleRemove={handleRemove}
            />
        </div>
    )
};
MediaContainer.propTypes = {
    isImg: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
};
export default MediaContainer;
