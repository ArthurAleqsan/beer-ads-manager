import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { ASSETS_PATH } from '../../util/conf';


const RedactorHeader = () => {
    const { tvTemplate } = useSelector(s => s.global, shallowEqual);
    console.log(tvTemplate);

    return (
        <Row className='redactor-header'>
            <Col span={8} className='header-icon-container'>
                <img src={`${ASSETS_PATH}/images/icons/tv.svg`} className='icon' />
                <span>TV: {tvTemplate?.screens} шт</span>
            </Col>
            <Col span={8} className='header-icon-container'>
                <img src={`${ASSETS_PATH}/images/icons/shop.svg`} className='icon' />
                <span>Магазинов: {tvTemplate?.countShops} шт</span>
            </Col>
            <Col span={8} className='header-icon-container'>
                <img src={`${ASSETS_PATH}/images/icons/crane.svg`} className='icon' />
                <span>Кранов: {tvTemplate?.countCranes} шт</span>
            </Col>
        </Row>
    )
};

export default RedactorHeader;
