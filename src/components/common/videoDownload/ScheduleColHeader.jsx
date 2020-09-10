import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload , message} from 'antd';

const ScheduleColHeader = () => {
    const [fileName, setFileName] = useState('');
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setFileName(info.file.name);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
    return (
        <div className='scehdule-header-container'>
            <div className='name-container'>
                <span>{name}</span>
            </div>
            {fileName ? <div className='file-name-container'><span>{fileName}</span></div> : <Upload {...props}>
                <div className='schedule-upload'>+ Загрузить шаблон</div>
            </Upload>}
        </div>
    )
};
ScheduleColHeader.propTypes = {};
export default ScheduleColHeader;
