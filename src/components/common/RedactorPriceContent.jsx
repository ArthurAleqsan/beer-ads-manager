import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import Drag from './D_D/Drag';
import MediaContainer from './MediaContainer';
import ShopSelector from './ShopSelector';
import EditPriceContentPopup from '../popups/EditPriceContentPopup';
import { getTvTemplates } from '../../store/global/global.actions';
import Product from './Product';
import { useLocation } from 'react-router-dom';
import { getParam } from '../../util/helpers';


const RedactorPriceContent = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    // const { search } = useLocation();
    const toogleModal = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        // console.log(search);
        const search = window.location.search; 
        const template_id = search ? getParam(search, '?template_id=', 1) : 1;
        console.log(template_id);
        getTvTemplates(dispatch, template_id);
    }, []);
    const { products } = useSelector(s => s.global, shallowEqual);

    return (
        <div className='price-container-content redactor-content'>
            <button className='yellow-btn react-button' onClick={toogleModal}>Редактировать прайс</button>
            <div className='shop-selector-container'>
                <ShopSelector />
            </div>

            <div className='media-content'>
                {products ? products.map(media => { 
                    return <Drag
                        key={media.id}
                        dataItem={media}
                        dropEffect="copy"><Product file={media} /></Drag>
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
