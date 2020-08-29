import React, { useRef, useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setStoreValue } from '../store/global/global.actions';

const TimeLine = () => {
    const fake_tvCounts = ['tv-1', 'tv-2'];
    const contentRef = useRef();
    const [lineHeight, setLineHeight] = useState(190);
    const { tvCount, videoContentRows, duration } = useSelector(s => s.global, shallowEqual);
    const dispatch = useDispatch();
    const [contentRow, setContentRow] = useState({
        obj_1: null,
        obj_2: null,
        obj_3: null,
        dur: null,
        id: null,
    });
    useLayoutEffect(() => {
        const o_H = contentRef.current.offsetHeight;
        tvCount && setLineHeight(o_H / tvCount);
    });
    const handleAdd = () => {
        dispatch(setStoreValue('videoContentRows', contentRow));
    };
    return (
        <div className='player-timeline'>
            <Row className='timeline-header'>
                <Col span={2} className='total-time'>{duration}</Col>
                <Col span={22} >
                    {videoContentRows.map(item => <span></span>)}
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
                    {fake_tvCounts.map((_, i) => <Row key={i} className='video-timeline' style={{ height: lineHeight }}>

                    </Row>)}
                    <button className='blue-dashed' onClick={() => console.log('object')}>+ Добавить слайд</button>
                </Col>
            </Row>
        </div>
    )
};

export default TimeLine;
