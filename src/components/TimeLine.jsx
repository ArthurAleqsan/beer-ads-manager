import React, { useRef, useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';

const TimeLine = () => {
    const tvCounts = ['tv-1', 'tv-2'];
    const contentRef = useRef();
    const [lineHeight, setLineHeight] = useState(190);
    useLayoutEffect(() => {
        const o_H = contentRef.current.offsetHeight;
        setLineHeight(o_H / tvCounts.length);
    })
    return (
        <div className='player-timeline'>
            <Row className='timeline-header'>
                <Col span={2} className='total-time'>
                    00.00.00
                </Col>
                <Col span={22} >

                </Col>
            </Row>
            <Row className='timeline-body' ref={contentRef}>
                <Col span={2} >
                    {tvCounts.map(c => <div style={{ height: lineHeight }} key={c} className ='timeline-title-container'>
                        <img src='/assets/images/icons/tv.svg' className = 'title-icon' />
                        <span className = 'timeline-title'>{c}</span>
                    </div>)}
                </Col>
                <Col span={22} className = 'timeline-content'>
                    {tvCounts.map((_, i) => <Row key={i} className='video-timeline' style={{ height: lineHeight }}>

                    </Row>)}
                </Col>
            </Row>
        </div>
    )
};

export default TimeLine;
