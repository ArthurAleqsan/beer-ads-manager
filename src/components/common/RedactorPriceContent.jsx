import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import Drag from './D_D/Drag';
import MediaContainer from './MediaContainer';
import ShopSelector from './ShopSelector';
import EditPriceContentPopup from '../popups/EditPriceContentPopup';
import { getTvTemplates, setStoreValue } from '../../store/global/global.actions';
import Product from './Product';
import { useLocation } from 'react-router-dom';
import { getParam } from '../../util/helpers';


const RedactorPriceContent = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { search } = useLocation();
    const toogleModal = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const template_id = search && search.includes('template_id=') ? getParam(search, '?template_id=', 1) : 1;
        dispatch(setStoreValue('template_id', template_id));
        getTvTemplates(dispatch, template_id);
    }, []);
    const { prices } = useSelector(s => s.global, shallowEqual);

    console.log(prices);

    return (
        <div className='price-container-content redactor-content'>
            <button className='yellow-btn react-button' onClick={toogleModal}>Редактировать прайс</button>
            <div className='shop-selector-container'>
                <ShopSelector />
            </div>

            <div className='media-content'>
                {prices ? prices.map(media => {
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
