import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import { getUploadProps } from '../helpers';
import MediaContainer from './MediaContainer';
import Box from './DND/Box';

const { Dragger } = Upload;

const fakeImages = [
    {
        id: 1,
        url: '/assets/images/fake/1.jpg',
        name: '1',
    },
    {
        id: 2,
        url: '/assets/images/fake/2.jpg',
        name: '2',
    },
    {
        id: 3,
        url: '/assets/images/fake/3.jpg',
        name: '3',
    },
    {
        id: 4,
        url: '/assets/images/fake/4.jpg',
        name: '4',
    },
    {
        id: 5,
        url: '/assets/images/fake/5.jpg',
        name: '5',
    },
];

const RedactorMediaCondtent = ({ isImgType }) => {
    const props = getUploadProps();
    return (
        <div className='media-container-content redactor-content'>
            <Dragger {...props}>
                <div className='dragger-text-container'>
                    <span>Нажмите сюда или перенесите файл для загрузки</span>
                    <span>Максимальный размер 400 МБ.</span>
                    <span>Поддерживаются {isImgType ? 'изображения:*.jpg, *.png.' : 'видео:*.mp4, *.mov'}</span>
                </div>
            </Dragger>
            <div className='media-content'>
                {fakeImages.map(media => {
                    return <Box key={media.id} file = {media}><MediaContainer file={media} isImg={isImgType} /></Box>
                })}
            </div>
        </div>
    )
};

RedactorMediaCondtent.propTypes = {
    isImgType: PropTypes.bool,
}

export default memo(RedactorMediaCondtent);
