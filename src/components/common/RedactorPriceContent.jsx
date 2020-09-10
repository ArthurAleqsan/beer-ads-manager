import React, { useState } from 'react';
import Drag from './D_D/Drag';
import MediaContainer from './MediaContainer';
import ShopSelector from './ShopSelector';
import EditPriceContentPopup from '../popups/EditPriceContentPopup';


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

            </div>
            <EditPriceContentPopup
                visible={visible}
                handleCancel = {toogleModal}
            />
        </div>
    )
};

export default RedactorPriceContent;
