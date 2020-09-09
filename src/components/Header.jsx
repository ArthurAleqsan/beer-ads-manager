import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collapse } from '../store/global/global.actions';
import VideoDownloadPopup from './popups/VideoDownloadPopup';

const Header = () => {
    const dispatch = useDispatch();
    const { collapsed, canDownload } = useSelector(s => s.global);
    const [downloadModalVisible, setDownloadModalVisible] = useState(false);
    const handleCollapse = () => {
        dispatch(collapse(!collapsed));
    };
    const handleSave = () => {
        console.log('saved');
    };
    const handlDownload = () => {
        setDownloadModalVisible(true);
    }
    return (
        <div className='recorder-header main-content'>
            <div className='recorder-header-left-row'>
                <img src='/assets/images/icons/down.svg' className='basic-icon' onClick={handleCollapse} />
                <span className='header-title'>Создать видео</span>
            </div>
            <div className='recorder-header-right-row'>
                <button className='btn save-btn' onClick={handleSave}>Сохранить</button>
                <button
                    className={`btn download-btn yellow-btn ${canDownload ? '' : 'disabled-btn'}`}
                    onClick={handlDownload}
                    disabled={!canDownload}
                >Скачать</button>
            </div>
            <VideoDownloadPopup
                visible={downloadModalVisible}
                handleCancel={() => setDownloadModalVisible(false)}
            />
        </div>
    )
};

export default Header;
