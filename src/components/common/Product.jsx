import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import RemoveBtn from './RemoveBtn';
import RemoveItemPopup from '../popups/RemoveItemPopup';

const Product = ({ file }) => {
    const [visibility, setVisibility] = useState(false);
    const handleRemove = () => {
        console.log('removed' + file.id);
    };
    const openRemoveModal = () => {
        setVisibility(true);
    };
    const closeRemoveModal = () => {
        setVisibility(false);
    };
    return (
        <div className='product media-file-container'>
            <div className='name-container'>{file.name}</div>
            <RemoveBtn handleRemove={openRemoveModal} />
            <RemoveItemPopup
                visible={visibility}
                handleCancel={closeRemoveModal}
                handleRemove={handleRemove}
            />
        </div>
    )
};
Product.propTypes = {
    file: PropTypes.object.isRequired,
}
export default memo(Product);
