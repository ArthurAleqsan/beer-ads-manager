import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collapse } from '../store/global/global.actions';

const Header = () => {
    const dispatch = useDispatch();
    const collapsed = useSelector(s => s.global.collapsed);
    const handleCollapse = () => {
        dispatch(collapse(!collapsed));
    };
    const handleSave = () => {
        console.log('saved');
    };
    const handlDownload = () => {
        console.log('download');
    }
    return (
        <div className='recorder-header main-content'>
            <div className='recorder-header-left-row'>
                <img src='/assets/images/icons/down.svg' className='basic-icon' onClick={handleCollapse} />
                <span className = 'header-title'>Создать видео</span>
            </div>
            <div className='recorder-header-right-row'>
                <button className = 'btn save-btn' onClick = {handleSave}>Сохранить</button>
                <button className = 'btn download-btn yellow-btn' onClick = {handlDownload}>Скачать</button>
            </div>
        </div>
    )
};

export default Header;
