import React, { memo, useState, useEffect } from 'react';
import { Select } from 'antd';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getParam } from '../../util/helpers';
import { getProducts, setStoreValue } from '../../store/global/global.actions';
import { ASSETS_PATH } from '../../util/conf';

const { Option } = Select;


const ShopSelector = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { shops, selectedShop } = useSelector(s => s.global, shallowEqual);
    const hasSearchState = search.includes('shop=');
    const dispatch = useDispatch();

    if (!selectedShop && shops) {
        if (hasSearchState) {
            const shop = shops.find(s => s.id == getParam(search, 'shop=', 1));
            dispatch(setStoreValue('selectedShop', shop));
            getProducts(dispatch, shop.id);
            
        } else {
            getProducts(dispatch, shops[0].id);
            dispatch(setStoreValue('selectedShop', shops[0]));
        }
    }
    const handleChange = (v) => {
        const shop = shops.find(s => s.id == v);
        dispatch(setStoreValue('selectedShop', shop));
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