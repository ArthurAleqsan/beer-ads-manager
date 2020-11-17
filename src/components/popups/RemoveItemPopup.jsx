import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const RemoveItemPopup = ({ visible, handleCancel, handleRemove }) => {
    return (
        <Modal
            visible={visible}
            footer={null}
            header={null}
            closable={false}
            className='remove-item-modal'
            centered={true}
            maskClosable={true}
            onCancel={handleCancel}
        >
            <div className='modal-content'>
                <div className='modal-header'>
                    <span>Удалить</span>
                </div>
                <div className='modal-body'>
                    <span>Вы действительно хотите</span>
                    <span>удалить файл?</span>
                </div>
                <div className='modal-footer'>
                    <button className='save-btn react-button ' onClick={handleRemove}>Да, удалить</button>
                    <button className='cancel-btn react-button ' onClick={handleCancel}>Отмена</button>
                </div>
            </div>
        </Modal>
    )
};
RemoveItemPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
};
export default RemoveItemPopup;
