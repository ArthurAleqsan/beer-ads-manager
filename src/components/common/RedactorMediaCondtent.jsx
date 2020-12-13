import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Spin, message } from 'antd';
import MediaContainer from './MediaContainer';
import Drag from './D_D/Drag';
import { getImages, getVideos, uploadMedia } from '../../store/global/global.actions';
import { useDispatch, useSelector, shallowEqual, useStore } from 'react-redux';

const { Dragger } = Upload;

const RedactorMediaCondtent = ({ isImgType }) => {
    const dispatch = useDispatch();
    const { getState } = useStore();
    const props = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                uploadMedia(dispatch, getState, info.file.originFileObj);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }

    const { images } = useSelector(s => s.global, shallowEqual);
    useEffect(() => {
        isImgType ? getImages(dispatch) : getVideos(dispatch);
    }, []);

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
                {images ? images.map(media => {
                    return <Drag
                        key={media.id}
                        dataItem={media}
                        dragImage={media.url}
                        dropEffect="copy"><MediaContainer file={media} isImg={isImgType} /></Drag>
                }) : <Spin />}
            </div>
        </div>
    )
};

RedactorMediaCondtent.propTypes = {
    isImgType: PropTypes.bool,
}

export default memo(RedactorMediaCondtent);
