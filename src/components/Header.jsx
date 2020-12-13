import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { saveVideo } from '../store/global/global.actions';
import SuccessPopup from './popups/SuccessPopup';
// import { ASSETS_PATH } from '../util/conf';
// import VideoDownloadPopup from './popups/VideoDownloadPopup';

const Header = () => {
    const dispatch = useDispatch();
    const { getState } = useStore();
    const { canDownload } = useSelector(s => s.global);
    const [downloadModalVisible, setDownloadModalVisible] = useState(false);
    const [succesPopupVisible, setSuccesPopupVisible] = useState(false);
    const handleSave = () => {
        saveVideo(dispatch, getState);
        setSuccesPopupVisible(true);
    };
    const setSuccesPopupVisibility = () => {
        setSuccesPopupVisible(false);
    }
    const handlDownload = () => {
        setDownloadModalVisible(true);
        // saveVideo(dispatch, getState)
        // generateVideo()
    }
    return (
        <div className='recorder-header main-content'>
            <div className='recorder-header-left-row'>
                {/* <img src={`${ASSETS_PATH}/images/icons/down.svg`} className='basic-icon' onClick={handleCollapse} /> */}
                <span className='header-title'>Создать видео</span>
            </div>
            <div className='recorder-header-right-row'>
                <button className={`react-button save-btn ${canDownload ? '' : 'disabled-btn'}`} onClick={handleSave} disabled={!canDownload}>Сохранить</button>
                <button
                    className={`react-button download-btn yellow-btn disabled-btn`}
                    onClick={handlDownload}
                    
                >Скачать</button>
            </div>
            <SuccessPopup 
                visible = {succesPopupVisible}
                handleCancel = {setSuccesPopupVisibility}
            />
            {/* <VideoDownloadPopup
                visible={downloadModalVisible}
                handleCancel={() => setDownloadModalVisible(false)}
            /> */}
        </div>
    )
};

export default Header;
