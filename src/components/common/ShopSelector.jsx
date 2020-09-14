import React, { memo } from 'react';
import { Select } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';

const { Option } = Select;


const ShopSelector = () => {
    const handleChange = (v) => {
        console.log(v);
    }
    
    return (
        <Select
            defaultValue="lucy"
            className='shop-select'
            onChange={handleChange}
        >
            {/* {tvTemplates && tvTemplates.map(option => {
                return <Option value={option.name} key = {option.id}>
                    <div className='option-content'>
                        <div className='image-container'>
                            <img src='/assets/images/icons/bl-shop.svg' className='select-icon' />
                        </div>
                        <div className='text-container'>
                            {'Public'}
                        </div>
                    </div>
                </Option>
            })} */}
            <Option value="lucy">
                <div className='option-content'>
                    <div className='image-container'>
                        <img src='/assets/images/icons/bl-shop.svg' className='select-icon' />
                    </div>
                    <div className='text-container'>
                        {'Public'}
                    </div>
                </div>
            </Option>
            <Option value="asdasd">
                <div className='option-content'>
                    <div className='image-container'>
                        <img src='/assets/images/icons/bl-shop.svg' className='select-icon' />
                    </div>
                    <div className='text-container'>
                        {'Publasdasdic'}
                    </div>
                </div>
            </Option>
        </Select>
    )
};

export default memo(ShopSelector);