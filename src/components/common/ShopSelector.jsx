import React, { memo, useState, useEffect } from 'react';
import { Select } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getParam } from '../../util/helpers';

const { Option } = Select;


const ShopSelector = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { shops } = useSelector(s => s.global, shallowEqual);
    const [selectedShop, selectShop] = useState(null);
    const hasSearchState = search.includes('shop=');
    useEffect(() => {
        if (hasSearchState) {
            const shop = shops && shops.find(s => s.id == getParam(search, 'shop=', 1));
            selectShop(shop);
        } else {
            shops && console.log(shops[0]);
            shops && selectShop(shops[0]);
        }
    });
    const handleChange = (v) => {
        history.push(`/shop=${v}`);
    }
    console.log(selectedShop);
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