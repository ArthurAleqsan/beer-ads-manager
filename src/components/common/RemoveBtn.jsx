import React from 'react';
import PropTypes from 'prop-types';

const RemoveBtn = ({ handleRemove }) => {
    return (
        <div className='remove-btn-container'>
            <img src='/assets/images/icons/bin.svg' onClick={handleRemove} className='remove-icon' />
        </div>
    )
};
RemoveBtn.propTypes = {
    handleRemove: PropTypes.func.isRequired,
};
export default RemoveBtn;
