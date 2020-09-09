import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ShcheduleColHeader = ({ name }) => {
    const [hasFile, sethasFile] = useState(true);
    return (
        <div className='scehdule-header-container'>
            <div className='name-container'>
                <span>{name}</span>
            </div>
            {hasFile ? <div><span>555</span></div> : ''}
        </div>
    )
};
ShcheduleColHeader.propTypes = {
    name: PropTypes.string.isRequired,
};
export default ShcheduleColHeader;
