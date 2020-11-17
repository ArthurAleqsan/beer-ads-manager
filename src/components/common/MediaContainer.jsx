import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RemoveBtn from './RemoveBtn';
import RemoveItemPopup from '../popups/RemoveItemPopup';
import { ASSETS_PATH, PUBLIC_PATH } from '../../util/conf';
import { useDispatch, useStore } from 'react-redux';
import { removeItem } from '../../store/global/global.actions';

const MediaContainer = ({ isImg, file }) => {
    const { image, name, id } = file;
    const [visibility, setVisibility] = useState(false);
    const dispatch = useDispatch();
    const { getState } = useStore();
    const handleRemove = () => {
        removeItem(dispatch, getState, id, isImg ? 'image' : 'video');
        setVisibility(false);
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
                ? <img src={`${PUBLIC_PATH}${image}`} className='content-media' />
                : <div className='video-container'>
                    <img src={`${PUBLIC_PATH}/${image}`} className='content-media' /> 
                    <div className='video-bottom-container'>
                        <img src={`${ASSETS_PATH}/images/icons/player.svg`} />
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
    isImg: PropTypes.bool,
    file: PropTypes.object.isRequired,
};
export default MediaContainer;
