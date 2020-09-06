import React from 'react';
import { Select } from 'antd';
import Drag from './D_D/Drag';
import MediaContainer from './MediaContainer';

const { Option } = Select;
const fakeImages = [
    {
        id: 1,
        url: '/assets/images/fake/1.jpg',
        name: '1',
    },
    {
        id: 2,
        url: '/assets/images/fake/2.jpg',
        name: '2',
    },
    {
        id: 3,
        url: '/assets/images/fake/3.jpg',
        name: '3',
    },
    {
        id: 4,
        url: '/assets/images/fake/4.jpg',
        name: '4',
    },
    {
        id: 5,
        url: '/assets/images/fake/5.jpg',
        name: '5',
    },
];

const RedactorPriceContent = () => {
    const handleChange = (v) => {
        console.log(v);
    }
    return (
        <div className='price-container-content redactor-content'>
            <button className='yellow-btn btn'>Редактировать прайс</button>
            <Select
                defaultValue="lucy"
                className='shop-select'
                onChange={handleChange}
            >
                <Option value="lucy">
                    <div className='option-content'>
                        <div className='image-container'>
                            <img src='/assets/images/icons/bl-shop.svg' className = 'select-icon' />
                        </div>
                        <div className='text-container'>
                            {'Public'}
                        </div>
                    </div>
                </Option>
                <Option value="asdasd">
                    <div className='option-content'>
                        <div className='image-container'>
                            <img src='/assets/images/icons/bl-shop.svg' className = 'select-icon' />
                        </div>
                        <div className='text-container'>
                            {'Publasdasdic'}
                        </div>
                    </div>
                </Option>
            </Select>
            <div className='media-content'>
                {/* {fakeImages.map(media => {
                    return <Drag 
                    key={media.id} 
                    dataItem={media} 
                    dragImage={media.url} 
                    dropEffect="copy"><MediaContainer file={media} isImg={true} /></Drag>
                })} */}
            </div>
        </div>
    )
};

export default RedactorPriceContent;
