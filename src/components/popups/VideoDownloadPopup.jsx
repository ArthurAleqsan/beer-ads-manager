import React from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import RedactorHeader from '../common/RedactorHeader';

const VideoDownloadPopup = ({ visible, handleCancel }) => {
    return (
        <Modal
            visible={visible}
            footer={null}
            header={null}
            closable={false}
            className='download-video-modal'
            centered={true}
            maskClosable={true}
            onCancel={handleCancel}
        >
            <div className = 'modal-header'>
                <Row>
                    <Col span = {12}>
                        <RedactorHeader />
                    </Col>
                    <Col span = {6} offset = {6}>
                        sasdasd
                    </Col>
                </Row>
            </div>
        </Modal>
    )
};
VideoDownloadPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};
export default VideoDownloadPopup;
