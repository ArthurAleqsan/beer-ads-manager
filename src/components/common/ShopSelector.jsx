import React, { memo, useState, useEffect } from 'react';
import { Select } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getParam } from '../../util/helpers';
import { getProducts } from '../../store/global/global.actions';
import { useDispatch } from 'react-redux';

const { Option } = Select;


const ShopSelector = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { shops } = useSelector(s => s.global, shallowEqual);
    const [selectedShop, selectShop] = useState(null);
    const hasSearchState = search.includes('shop=');
    const dispatch = useDispatch();

    if (!selectedShop && shops) {
        if (hasSearchState) {
            const shop = shops.find(s => s.id == getParam(search, 'shop=', 1));
            selectShop(shop);
            getProducts(dispatch, shop.id);
            
        } else {
            getProducts(dispatch, shops[0].id);
            selectShop(shops[0]);
        }
    }
    const handleChange = (v) => {
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
                            <img src='/assets/images/icons/bl-shop.svg' className='select-icon' />
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