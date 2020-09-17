import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import Drag from './D_D/Drag';
import MediaContainer from './MediaContainer';
import ShopSelector from './ShopSelector';
import EditPriceContentPopup from '../popups/EditPriceContentPopup';
import { getTvTemplates } from '../../store/global/global.actions';
import Product from './Product';


const RedactorPriceContent = () => {
    const [visible, setVisible] = useState(false);
    const toogleModal = () => {
        setVisible(!visible);
    };
    const { products } = useSelector(s => s.global, shallowEqual);

    return (
        <div className='price-container-content redactor-content'>
            <button className='yellow-btn button' onClick={toogleModal}>Редактировать прайс</button>
            <div className='shop-selector-container'>
                <ShopSelector />
            </div>

            <div className='media-content'>
                {products ? products.map(media => {
                    return <Drag
                        key={media.id}
                        dataItem={media}
                        dropEffect="copy"><Product file = {media}/></Drag>
                }) : <Spin />}
            </div>
            <EditPriceContentPopup
                visible={visible}
                handleCancel={toogleModal}
            />
        </div>
    )
};

export default RedactorPriceContent;
