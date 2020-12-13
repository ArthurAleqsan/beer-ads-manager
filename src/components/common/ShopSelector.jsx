import React, { memo, useState, useEffect } from 'react';
import { Select } from 'antd';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getParam } from '../../util/helpers';
import { getPricesToTemplate, getProducts, setStoreValue } from '../../store/global/global.actions';
import { ASSETS_PATH } from '../../util/conf';

const { Option } = Select;


const ShopSelector = () => {
    const { search } = useLocation();
    const { getState } = useStore();
    const history = useHistory();
    const { shops, selectedShop } = useSelector(s => s.global, shallowEqual);
    const hasSearchState = search.includes('shop=');

    const templateId = getState().global.template_id;
    
    const dispatch = useDispatch();

    if (!selectedShop && shops) {

        if (hasSearchState) {
            const shop = shops.find(s => s.id == getParam(search, 'shop=', 1));
            dispatch(setStoreValue('selectedShop', shop));
            getPricesToTemplate(dispatch, shop.id, templateId);
            getProducts(dispatch, shop.id, templateId);

        } else {
            getPricesToTemplate(dispatch, shops.id, templateId);
            getProducts(dispatch, shops[0].id, templateId);
            dispatch(setStoreValue('selectedShop', shops[0]));
        }
    }
    const handleChange = (v) => {
        const shop = shops.find(s => s.id == v);
        dispatch(setStoreValue('selectedShop', shop));
        getPricesToTemplate(dispatch, shop.id, templateId);
        getProducts(dispatch, shop.id, templateId);
        history.push(`/?shop=${v}`);
    }
    return (
        selectedShop && <Select
            defaultValue={selectedShop.name}
            className='shop-select'
            onChange={handleChange}
        >
            {shops && shops.map(option => {
                return <Option value={option.id} key={option.id}>
                    <div className='option-content' >
                        <div className='image-container'>
                            <img src={`${ASSETS_PATH}/images/icons/bl-shop.svg`} className='select-icon' />
                        </div>
                        <div className='text-container'>
                            {option.name}
                        </div>
                    </div>
                </Option>
            })}
        </Select>
    )
};

export default memo(ShopSelector);