import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ASSETS_PATH } from '../util/conf';
// import VideoDownloadPopup from './popups/VideoDownloadPopup';

const Header = () => {
    const dispatch = useDispatch();
    const { canDownload } = useSelector(s => s.global);
    const [downloadModalVisible, setDownloadModalVisible] = useState(false);
    const handleSave = () => {
        console.log('saved');
    };
    const handlDownload = () => {
        console.log(7);
        setDownloadModalVisible(true);
    }
    return (
        <div className='recorder-header main-content'>
            <div className='recorder-header-left-row'>
                {/* <img src={`${ASSETS_PATH}/images/icons/down.svg`} className='basic-icon' onClick={handleCollapse} /> */}
                <span className='header-title'>Создать видео</span>
            </div>
            <div className='recorder-header-right-row'>
                <button className='button save-btn' onClick={handleSave}>Сохранить</button>
                <button
                    className={`button download-btn yellow-btn ${canDownload ? '' : 'disabled-btn'}`}
                    onClick={handlDownload}
                    disabled={!canDownload}
                >Скачать</button>
            </div>
            {/* <VideoDownloadPopup
                visible={downloadModalVisible}
                handleCancel={() => setDownloadModalVisible(false)}
            /> */}
        </div>
    )
};

export default Header;
