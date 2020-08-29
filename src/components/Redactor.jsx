import React, { useState } from 'react';
import { Row, Col } from 'antd';
import RedactorPriceContent from './common/RedactorPriceContent';
import RedactorMediaCondtent from './common/RedactorMediaCondtent';



const Redactor = () => {
    const TV = 1;
    const [activeTab, setActiveTab] = useState('price');
    const handleNavigation = (tab) => {
        setActiveTab(tab);
    };
    let redactorBody = null;

    switch (activeTab) {
        case 'price':
            redactorBody = <RedactorPriceContent />;
            break;
        case 'img':
            redactorBody = <RedactorMediaCondtent isImgType />;
            break;
        case 'video':
            redactorBody = <RedactorMediaCondtent />;
            break;
    }

    return (
        <div className='redactor'>
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
            <Row className='redactor-navigation'>
                <Col
                    span={8}
                    className={`header-nav-container ${activeTab == 'price' ? 'active-nav' : ''} ft-nav`}
                    onClick={() => handleNavigation('price')}
                >
                    {activeTab == 'price' && <img src='/assets/images/icons/TV-white.svg' className='icon' />}
                    <span>Прайс</span>
                </Col>
                <Col
                    span={8}
                    className={`header-nav-container ${activeTab == 'img' ? 'active-nav' : ''} sec-nav`}
                    onClick={() => handleNavigation('img')}
                >
                    {activeTab == 'img' && <img src='/assets/images/icons/TV-white.svg' className='icon' />}
                    <span>Изображения</span>
                </Col>
                <Col
                    span={8}
                    className={`header-nav-container ${activeTab == 'video' ? 'active-nav' : ''} th-nav`}
                    onClick={() => handleNavigation('video')}
                >
                    {activeTab == 'video' && <img src='/assets/images/icons/TV-white.svg' className='icon' />}
                    <span>Видео</span>
                </Col>
            </Row>
            {redactorBody}
        </div>
    )
};

export default Redactor;
