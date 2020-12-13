import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector, shallowEqual, useDispatch, useStore } from 'react-redux';

import { setStoreValue, addNewRow, changeItemToTimelineBox } from '../store/global/global.actions';
import SecondsInput from './common/SecondsInput';
import { getTimeValuefromDuration, getDurationSeconds, getTypeOfDroppedItem } from '../util/helpers';
import DropTarget from './common/D_D/DropTarget';
import DropedItem from './common/DropedItem';
import RemoveItemPopup from './popups/RemoveItemPopup';
import { ASSETS_PATH } from '../util/conf';
import { useLocation } from 'react-router-dom';


const TimeLine = () => {
    const screens_count = [];

    const contentRef = useRef();
    const [lineHeight, setLineHeight] = useState(190);
    const [buttonLeftStyle, setButtonLeftStyle] = useState(-40);
    const [visibility, setVisibility] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { tvCount, videoContentRows, duration, selectedShop } = useSelector(s => s.global, shallowEqual);
    const dispatch = useDispatch();
    const { getState } = useStore();
    for (let i = 0; i < tvCount; i++) {
        screens_count.push(`tv-${i + 1}`);
    }
    let contentRow = {
        tv_s: new Array(screens_count.length),
        dur: 60,
        id: 1,
    };
    // let loc = useLocation();
    // let idShop = loc.search.slice(loc.search.indexOf('=') + 1);
    // useLayoutEffect(() => {
    //     const o_H = contentRef.current.offsetHeight;
    //     tvCount && setLineHeight(o_H / tvCount);
    //     if (idShop) {
    //          console.log(7);

    //     }
    // }, []);
    const handleAdd = () => {
        setButtonLeftStyle(buttonLeftStyle + 120);
        if (videoContentRows) {
            addNewRow(dispatch, { ...contentRow, id: videoContentRows[videoContentRows.length - 1].id + 1 });
            dispatch(setStoreValue('duration', getTimeValuefromDuration(getDurationSeconds(duration) + 60)));
        } else {
            dispatch(setStoreValue('videoContentRows', [contentRow]));
            dispatch(setStoreValue('duration', getTimeValuefromDuration(60)));
        }
    };
    const [items, setItems] = useState([]);


    const itemDropped = item => setItems([...items, item]);

    const handleRemoveItem = () => {
        changeItemToTimelineBox(dispatch, getState, null, selectedId);
        setVisibility(false);
    };
    const openRemoveModal = (id) => {
        setSelectedId(id)
        setVisibility(true);
    };
    const closeRemoveModal = () => {
        setVisibility(false);
    };

    return (
        <div className='player-timeline'>
            <Row className='timeline-header'>
                <Col span={2} className='total-time'>{duration}</Col>
                <Col span={22} className='rows-timeline'>
                    {videoContentRows && videoContentRows.map(item => {
                        return <SecondsInput
                            key={item.id}
                            data={item}
                        />
                    })}
                </Col>
            </Row>
            <Row className='timeline-body' ref={contentRef}>
                <Col span={2} >
                    {screens_count.map(c => <div /*style={{ height: lineHeight }}*/ key={c} className='timeline-title-container'>
                        <img src={`${ASSETS_PATH}/images/icons/tv.svg`} className='title-icon' />
                        <span className='timeline-title'>{c}</span>
                    </div>)}
                </Col>
                <Col span={22} className='timeline-content'>
                    {screens_count.map((row, i) => <Row key={i} className='video-timeline' /*style={{ height: lineHeight }}*/ >
                        {videoContentRows && videoContentRows.map((r, j) => {
                            if (!r.tv_s[i]) {
                                return <DropTarget
                                    onItemDropped={itemDropped}
                                    dropEffect="copy"
                                    key={Math.random() * i * j}
                                    id={`${i + 1}_${j + 1}`}
                                >
                                    <div className='timeline-row-item'>
                                        <div className='empty-content-container'>
                                            <img src={`${ASSETS_PATH}/images/icons/add.svg`} />
                                            <span>Перетащите</span>
                                            <span>сюда</span>
                                        </div>
                                    </div>
                                </DropTarget>
                            } else {
                                return <div key={Math.random() * i * j} className='timeline-row-item'>
                                    <DropedItem
                                        type={getTypeOfDroppedItem(r.tv_s[i])}
                                        obj={r.tv_s[i]}
                                        handleRemove={() => openRemoveModal(`${i + 1}_${j + 1}`)}
                                    />
                                </div>
                            }
                        })}
                    </Row>)}
                    <button className='blue-dashed' onClick={handleAdd} style={{ left: buttonLeftStyle }}>+ Добавить слайд</button>
                </Col>
            </Row>
            <RemoveItemPopup
                visible={visibility}
                handleCancel={closeRemoveModal}
                handleRemove={handleRemoveItem}
            />
        </div>
    )
};

export default TimeLine;
