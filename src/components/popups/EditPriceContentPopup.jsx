import React, { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import RedactorHeader from '../common/RedactorHeader';
import ShopSelector from '../common/ShopSelector';
import ScheduleColHeader from '../common/schedule/ScheduleColHeader';
import ScheduleItem from '../common/schedule/ScheduleItem';


const EditPriceContentPopup = ({ visible, handleCancel }) => {
    const { tvCount, selectedShop, products } = useSelector(s => s.global, shallowEqual);
    const [localSelectedShop, setLocalSelectedShop] = useState(null);
    const [tvS, setTvS] = useState([]);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        setLocalSelectedShop(selectedShop);
    }, []);
    if(products && !product) {
        const _ = [];
        const obj = {
            all_products: products.filter(p => p.screen == null),
        }
        for(let i = 1; i < tvCount + 1; i++) {
            _.push(`TV-${i}`);
            obj[`product_${i}`] = products.filter(p => p.screen == i);
        }
        setTvS(_);
        setProduct(obj);
    }


    const handleChange = (e) => {
        setLocalSelectedShop(e.target.value);
    };
    let colSpan = 6;
    console.log(tvCount);
    if (24 / (tvCount + 1) < 6) {
        console.log(8888);
        colSpan = 24 / tvCount - 1;
    } else if (24 / (+tvCount + 1) == 6) {
        console.log(7896);
        colSpan = 6;
    }
    const handleCancelChanges = () => {
        handleCancel();
    };
    const handlSave = () => {
        console.log('saved');
    };
    const canSave = true;
    
    return (
        selectedShop && <Modal
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
                            value={localSelectedShop ? localSelectedShop.name : selectedShop.name}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <div className='shop-selector-container'>
                    <ShopSelector />
                </div>
            </div>
            <Row className={`modal-body multicol-content`}>
                <DragDropContext
                onDragEnd = {(r) => console.log(r)}
                >
                    <div style={{width: 100 / (tvCount + 1) - 2 + '%'}} className={'content-col'} key={name}>
                        <ScheduleColHeader
                            name='Не сортированные'
                        />
                            <div className='schedule-items-container'>
                                <Droppable droppableId={`droppable-0`}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {product.all_products && product.all_products.map((product, j) => {
                                                return <>
                                                    <Draggable draggableId={`draggable-0_${(j + 1)}`} index={j}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <ScheduleItem item={product} />
                                                            </div>
                                                        )}
                                                    </ Draggable>
                                                    {provided.placeholder}
                                                </>
                                            })}

                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    
                    {tvS.map((name, i) => {
                        console.log(colSpan);
                        return <div style={{width: 100 / (tvCount + 1) - 2 + '%'}} className={'content-col'} key={name}>
                            <ScheduleColHeader
                                name={name}
                            />
                            <div className='schedule-items-container'>
                                <Droppable droppableId={`droppable-${i + 1}`}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {product[`product_${i+1}`] && product[`product_${i+1}`].map((p, j) => {
                                                return <>
                                                    <Draggable draggableId={`draggable-${(i + 1)+'_'+(j + 1)}`} index={j}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <ScheduleItem item={p} />
                                                            </div>
                                                        )}
                                                    </ Draggable>
                                                    {provided.placeholder}
                                                </>
                                            })}

                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    })}
                </DragDropContext>
            </Row>
            <div className='modal-footer buttons-container'>
                <button className='button cancel-btn' onClick={handleCancelChanges}>Отмена</button>
                <button
                    className={`button save-btn yellow-btn ${canSave ? '' : 'disabled-btn'}`}
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
