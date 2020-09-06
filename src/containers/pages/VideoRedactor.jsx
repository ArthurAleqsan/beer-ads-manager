import React from 'react';
import { Row, Col } from 'antd';

import Header from '../../components/Header';
import Redactor from '../../components/Redactor';
import TimeLine from '../../components/TimeLine';
import Footer from '../../components/Footer';
import VideosPlayer from '../../components/VideosPlayer';


const VideoRedactor = () => {

    return (<div className='video-redactor-container'>
        <Header />
        <Row className='main-content'>
            <Col span={10}>
                <Redactor />
            </Col>
            <Col span={13} offset={1}>
                <VideosPlayer />
            </Col>
        </Row>
        <TimeLine />
        <Footer />
    </div>)
};

export default VideoRedactor;
