import React, { useRef, useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { setStoreValue, addNewRow } from '../store/global/global.actions';
import SecondsInput from './common/SecondsInput';
import { getTimeValuefromDuration, getDurationSeconds } from '../util/helpers';
import DropTarget from './common/D_D/DropTarget';


const TimeLine = () => {
    const fake_tvCounts = ['tv-1', 'tv-2'];
    const contentRef = useRef();
    const [lineHeight, setLineHeight] = useState(190);
    const [buttonLeftStyle, setButtonLeftStyle] = useState(-10);
    const { tvCount, videoContentRows, duration } = useSelector(s => s.global, shallowEqual);
    const dispatch = useDispatch();
    const contentRow = {
        tv_s: new Array(fake_tvCounts.length),
        dur: 60,
        id: 1,
    };
    useLayoutEffect(() => {
        const o_H = contentRef.current.offsetHeight;
        tvCount && setLineHeight(o_H / tvCount);
    });

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
    const [items, setItems] = React.useState([]);
   

    const itemDropped = item => setItems([...items, item]);

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
                    {fake_tvCounts.map(c => <div style={{ height: lineHeight }} key={c} className='timeline-title-container'>
                        <img src='/assets/images/icons/tv.svg' className='title-icon' />
                        <span className='timeline-title'>{c}</span>
                    </div>)}
                </Col>
                <Col span={22} className='timeline-content'>
                    {fake_tvCounts.map((row, i) => <Row key={i} className='video-timeline' style={{ height: lineHeight }}>
                        {videoContentRows && videoContentRows.map((r, j) => {
                            if (!r.tv_s[i]) {
                                // console.log(i);
                                return <DropTarget
                                    onItemDropped={itemDropped}
                                    dropEffect="copy"
                                    key={i * j}
                                    id={`${i + 1}_${j + 1}`}
                                >
                                    <div className='timeline-row-item'>
                                        <div className='empty-content-container'>
                                            <img src='/assets/images/icons/add.svg' />
                                            <span>Перетащите</span>
                                            <span>сюда</span>
                                        </div>
                                    </div>
                                </DropTarget>
                            } else {
                                // console.log(`${i + 1}_${j + 1}`);
                                return <div key={i * j} className='timeline-row-item'>
                                    <img src={r.tv_s[i].url} />
                                </div>
                            }
                        })}
                    </Row>)}
                    <button className='blue-dashed' onClick={handleAdd} style={{ left: buttonLeftStyle - 30}}>+ Добавить слайд</button>
                </Col>
            </Row>
        </div>
    )
};

export default TimeLine;
