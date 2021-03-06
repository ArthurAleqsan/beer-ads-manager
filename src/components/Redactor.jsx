import React, { useState } from 'react';
import { Row, Col } from 'antd';
import RedactorPriceContent from './common/RedactorPriceContent';
import RedactorMediaCondtent from './common/RedactorMediaCondtent';
import RedactorHeader from './common/RedactorHeader';
import { ASSETS_PATH } from '../util/conf';



const Redactor = () => {
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
            <RedactorHeader />
            <Row className='redactor-navigation'>
                <Col
                    span={8}
                    className={`header-nav-container ${activeTab == 'price' ? 'active-nav' : ''} ft-nav`}
                    onClick={() => handleNavigation('price')}
                >
                    {activeTab == 'price' && <img src={`${ASSETS_PATH}/images/icons/TV-white.svg`} className='icon' />}
                    <span>Прайс</span>
                </Col>
                <Col
                    span={8}
                    className={`header-nav-container ${activeTab == 'img' ? 'active-nav' : ''} sec-nav`}
                    onClick={() => handleNavigation('img')}
                >
                    {activeTab == 'img' && <img src={`${ASSETS_PATH}/images/icons/TV-white.svg`} className='icon' />}
                    <span>Изображения</span>
                </Col>
                <Col
                    span={8}
                    className={`header-nav-container ${activeTab == 'video' ? 'active-nav' : ''} th-nav`}
                    onClick={() => handleNavigation('video')}
                >
                    {activeTab == 'video' && <img src={`${ASSETS_PATH}/images/icons/TV-white.svg`} className='icon' />}
                    <span>Видео</span>
                </Col>
            </Row>
            {redactorBody}
        </div>
    )
};

export default Redactor;
