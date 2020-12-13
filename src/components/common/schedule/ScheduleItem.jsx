import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { PUBLIC_PATH } from '../../../util/conf';

const ScheduleItem = ({ item }) => {
    const { id, imgText, name, price, hasDiscount, image, productid } = item;
    const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
    ];
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    return (
        <div className='schedule-item-container'>
            <div className='id-container'>
                <img src='/assets/images/icons/list.svg' />
                <span>{productid}</span>
            </div>
            <div className='image-container'>
                <img src={`${PUBLIC_PATH}/upload/product/${image}`} className='item-url' />
                <div className='name-line'>
                    <span>{imgText}</span>
                </div>
            </div>
            <div className='name-container'>
                <span>{name}</span>
            </div>
            <div className='price-container'>
                <span>{price} ₽</span>
            </div>
            <div className='discount-container' >
                <Checkbox.Group options={options} defaultValue={[]} onChange={onChange} />
            </div>
        </div>
    )
};
ScheduleItem.propTypes = {
    item: PropTypes.object.isRequired,
};
export default ScheduleItem;
