import React, { useState } from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import RedactorHeader from '../common/RedactorHeader';
import ShopSelector from '../common/ShopSelector';
import ShcheduleColHeader from '../common/videoDownload/ShcheduleColHeader';

const EditPriceContentPopup = ({ visible, handleCancel }) => {
    const [defName, setDefName] = useState('Прайс_Осень 2020')
    const handleChange = (e) => {
        setDefName(e.target.value);
    }
    return (
        <Modal
            visible={visible}
            footer={null}
            header={null}
            closable={false}
            className='edit-priceContent-modal'
            centered={true}
            maskClosable={true}
            onCancel={handleCancel}
        >
            <div className='modal-header'>
                <Row>
                    <Col span={12}>
                        <RedactorHeader />
                    </Col>
                    <Col span={6} offset={6}>
                        <input
                            className='header-input'
                            value={defName}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <div className='shop-selector-container'>
                    <ShopSelector />
                </div>
            </div>
            <Row className='modal-body'>
                <Col span = {8}>
                    <ShcheduleColHeader 
                        name = {'TV 1'}
                    />
                </Col>
            </Row>
        </Modal>
    )
};
EditPriceContentPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};
export default EditPriceContentPopup;
