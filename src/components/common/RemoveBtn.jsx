import React from 'react';
import PropTypes from 'prop-types';
import { ASSETS_PATH } from '../../util/conf';

const RemoveBtn = ({ handleRemove }) => {
    return (
        <div className='remove-btn-container'>
            <img src={`${ASSETS_PATH}/images/icons/bin.svg`} onClick={handleRemove} className='remove-icon' />
        </div>
    )
};
RemoveBtn.propTypes = {
    handleRemove: PropTypes.func.isRequired,
};
export default RemoveBtn;
