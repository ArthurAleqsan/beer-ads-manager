import React from 'react';
import { Row, Col } from 'antd';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Header from '../../components/Header';
import Redactor from '../../components/Redactor';
import TimeLine from '../../components/TimeLine';


const VideoRedactor = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='video-redactor-container'>
                <Header />
                <Row className='main-content'>
                    <Col span={10}>
                        <Redactor />
                    </Col>
                    <Col span={10} offset={2}>aaaa</Col>
                </Row>
                <TimeLine />
            </div>
        </DndProvider>

    )
};

export default VideoRedactor;
