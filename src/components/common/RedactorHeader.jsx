import React from 'react';
import {Row, Col} from 'antd';


const RedactorHeader = () => {
    const TV = 1;
    return (
        <Row className='redactor-header'>
            <Col span={8} className='header-icon-container'>
                <img src='/assets/images/icons/tv.svg' className='icon' />
                <span>TV: {TV} шт</span>
            </Col>
            <Col span={8} className='header-icon-container'>
                <img src='/assets/images/icons/shop.svg' className='icon' />
                <span>Магазинов: {TV} шт</span>
            </Col>
            <Col span={8} className='header-icon-container'>
                <img src='/assets/images/icons/crane.svg' className='icon' />
                <span>Кранов: {TV} шт</span>
            </Col>
        </Row>
    )
};

export default RedactorHeader;
