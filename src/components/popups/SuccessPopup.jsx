import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const SuccessPopup = ({ visible, handleCancel }) => {
    return (
        <Modal
            visible={visible}
            footer = {null}
            maskClosable={true}
            onCancel={handleCancel}
        >
            <div className='modal-content success-popup-modal'>
                <div className='modal-body'>
                    <span className='first-span'>После сохранения вы можете увидить резултат на сервере через </span>
                    <span className='second-span'> 30 минут </span>
                </div>
                <div className='modal-footer'>
                    <button className='save-btn react-button yellow-btn' onClick={handleCancel}>Ок</button>
                </div>
            </div>
        </Modal>
    )
};
SuccessPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
}
export default SuccessPopup;
