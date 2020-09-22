import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useStore } from 'react-redux';
import { changeRowContent } from '../../store/global/global.actions';
import { ASSETS_PATH } from '../../util/conf';

const SecondsInput = ({ data }) => {
    const dispatch = useDispatch();
    const { getState } = useStore();
    const handleOnChange = (e) => {
       changeRowContent(dispatch, getState, 'dur', e.target.value, data.id);
    };
    const handleArrowClick = (isIncrease) => {
        const dur = isIncrease ? +data.dur + 1 : +data.dur - 1;
        changeRowContent(dispatch, getState, 'dur', dur, data.id);
    };
    return (
        <div className='seconds-input'>
            <div className='time-container'>
                <input
                    type='number'
                    value={data.dur}
                    onChange={handleOnChange}
                    style={{ width: data.dur > 9999 ? 50 : 35 }}
                />
                <span>s</span>
            </div>
            <div className='arrow-buttons-container'>
                <img src={`${ASSETS_PATH}/images/icons/arrow_drop_up.svg`} onClick={() => handleArrowClick(true)} />
                <img src={`${ASSETS_PATH}/images/icons/arrow_drop_down.svg`} onClick={() => handleArrowClick(false)} />
            </div>
        </div>
    )
};
SecondsInput.propTypes = {
    data: PropTypes.object.isRequired,
};
export default SecondsInput;
