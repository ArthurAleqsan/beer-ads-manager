import React, { useState } from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import RedactorHeader from '../common/RedactorHeader';
import ShopSelector from '../common/ShopSelector';
import ScheduleColHeader from '../common/schedule/ScheduleColHeader';
import { useSelector, shallowEqual } from 'react-redux';
import ScheduleItem from '../common/schedule/ScheduleItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditPriceContentPopup = ({ visible, handleCancel }) => {
    const [defName, setDefName] = useState('Прайс_Осень 2020');
    const { tvCount } = useSelector(s => s.global, shallowEqual);
    const handleChange = (e) => {
        setDefName(e.target.value);
    };
    let colSpan = 8;
    if (24 / tvCount < 8) {
        colSpan = 24 / tvCount - 1;
    } else if (24 / tvCount == 8) {
        colSpan = 7;
    }
    const handleCancelChanges = () => {
        handleCancel();
    }; 
    const handlSave = () => {
        console.log('saved');
    };
    const canSave = true;
    return (
        <Modal
            visible={visible}
            footer={null}
            header={null}
            closable={false}
            className='edit-priceContent-modal'
            centered={true}
            maskClosable={true}
            onCancel={handleCancel}
        >
            <div className='modal-header'>
                <Row>
                    <Col span={12}>
                        <RedactorHeader />
                    </Col>
                    <Col span={6} offset={6}>
                        <input
                            className='header-input'
                            value={defName}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <div className='shop-selector-container'>
                    <ShopSelector />
                </div>
            </div>
            <Row className={`modal-body ${tvCount > 2 ? 'multicol-content' : 'mincol-content'}`}>
                <DragDropContext>
                    <Col span={colSpan} className={'content-col'}>
                        <ScheduleColHeader
                            name={'TV 1'}
                        />
                        <div className='schedule-items-container'>
                            <Droppable droppableId="droppable-1" type="PERSON">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Draggable draggableId="draggable-1" index={0}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ScheduleItem item={{ id: 5, imgText: '1/15', name: 'Мартовское темное Ф', price: '60 R', hasDiscount: true }} />
                                            </div>
                                        )}
                                    </ Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="droppable-1" type="PERSON">
                                {(provided, snapshot) => {
                                    console.log(provided);
                                    return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Draggable draggableId="draggable-2" index={1}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ScheduleItem item={{ id: 5, imgText: '1/15', name: 'Мартовское темное Ф', price: '60 R', hasDiscount: false }} />
                                            </div>
                                        )}
                                    </ Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}}
                            </Droppable>
                        </div>
                    </Col>
                    <Col span={colSpan} className={'content-col'}>
                        <ScheduleColHeader
                            name={'TV 2'}
                        />
                        <div className='schedule-items-container'>
                            <Droppable droppableId="droppable-2" type="PERSON">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Draggable draggableId="draggable-3" index={0}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ScheduleItem item={{ id: 5, imgText: '1/15', name: 'Мартовское темное Ф', price: '60 R', hasDiscount: true }} />
                                            </div>
                                        )}
                                    </ Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="droppable-2" type="PERSON">
                                {(provided, snapshot) => {
                                    console.log(provided);
                                    return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Draggable draggableId="draggable-4" index={4}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ScheduleItem item={{ id: 5, imgText: '1/15', name: 'Мартовское темное Ф', price: '60 R', hasDiscount: false }} />
                                            </div>
                                        )}
                                    </ Draggable>
                                        {provided.placeholder}
                                    </div>
                                )}}
                            </Droppable>
                        </div>

                    </Col>
                </DragDropContext>
            </Row>
            <div className = 'modal-footer buttons-container'>
            <button className='btn save-btn' onClick={handleCancelChanges}>Отмена</button>
                <button
                    className={`btn download-btn yellow-btn ${canSave ? '' : 'disabled-btn'}`}
                    onClick={handlSave}
                    disabled={!canSave}
                >Сохранить</button>
            </div>
        </Modal>
    )
};
EditPriceContentPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};
export default EditPriceContentPopup;
