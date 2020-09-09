import React, { useState } from 'react';
import Drag from './D_D/Drag';
import MediaContainer from './MediaContainer';
import ShopSelector from './ShopSelector';
import EditPriceContentPopup from '../popups/EditPriceContentPopup';



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
    const [visible, setVisible] = useState(false);
    const toogleModal = () => {
        setVisible(!visible);
    };

    return (
        <div className='price-container-content redactor-content'>
            <button className='yellow-btn btn' onClick = {toogleModal}>Редактировать прайс</button>
            <div className='shop-selector-container'>
                <ShopSelector />
            </div>

            <div className='media-content'>
                {/* {fakeImages.map(media => {
                    return <Drag 
                    key={media.id} 
                    dataItem={media} 
                    dragImage={media.url} 
                    dropEffect="copy"><MediaContainer file={media} isImg={true} /></Drag>
                })} */}
            </div>
            <EditPriceContentPopup
                visible={visible}
                handleCancel = {toogleModal}
            />
        </div>
    )
};

export default RedactorPriceContent;
