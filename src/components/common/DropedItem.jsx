import React from 'react';
import PropTypes from 'prop-types';
import RemoveBtn from './RemoveBtn';

const DropedItem = ({ type, obj, handleRemove }) => {
    let item;
    switch (type) {
        case 'image':
            item = <div className='media-droped-item'>
                <img src={obj.url} className='media-droped-item-url' />
                <div className='name-line'>
                    <span>{obj.name}</span>
                </div>
                <RemoveBtn handleRemove={handleRemove} />
            </div>
            break;
        case 'video':
            item = <div className='media-droped-item'>
                <video controls={false}>
                    <source src="movie.mp4" type="video/mp4" />
                </video>
                <div className='name-line'>
                    <span>{obj.name}</span>
                </div>
                <RemoveBtn handleRemove={handleRemove} />
            </div>
            break;
        default:

    }
    return item;
};

DropedItem.propTypes = {
    type: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired,
    obj: PropTypes.object.isRequired,
};

export default DropedItem;
