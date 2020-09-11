import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ScheduleColHeader = ({ name }) => {
    // const [fileName, setFileName] = useState('');
    return (
        <div className='scehdule-header-container'>
            <div className='name-container'>
                <span>{name}</span>
            </div>
            {/* {fileName ? <div className='file-name-container'><span>{fileName}</span></div> : <Upload {...props}>
                <div className='schedule-upload'>+ Загрузить шаблон</div>
            </Upload>} */}
        </div>
    )
};
ScheduleColHeader.propTypes = {
    name: PropTypes.string.isRequired,
};
export default ScheduleColHeader;
