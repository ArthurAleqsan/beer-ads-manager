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
    const [tvS, setTV_S] = useState([]);
    useEffect(() => {
        setLocalSelectedShop(selectedShop);
    }, []);
    useEffect(() => {
        for (let i = 0; i < tvCount; i++) {
            const obj = {
                name: `TV ${i + 1}`,
                products_1: products && products.filter(p => p.screen == 1),
                products_2: products && products.filter(p => p.screen == 2),
                products_3: products && products.filter(p => p.screen == 3),
                all_products: products && products.filter(p => !p.screen),
            }
            tvS.push(obj);
        }
    }, [products]);

    const handleChange = (e) => {
        setLocalSelectedShop(e.target.value);
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
            <Row className={`modal-body ${tvCount > 2 ? 'multicol-content' : 'mincol-content'}`}>
                <DragDropContext>
                    {tvS.map((obj, i) => {
                        console.log(obj);
                        return <Col span={colSpan} className={'content-col'} key={name}>
                            <ScheduleColHeader
                                name={obj.name}
                            />
                            <div className='schedule-items-container'>
                                <Droppable droppableId={`droppable-${i + 1}`}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {obj.all_products && obj.all_products.map((product, j) => {
                                                console.log(product);
                                                return <>
                                                    <Draggable draggableId={`draggable-${(i + 1)+'_'+(j + 1)}`} index={j}>
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
                        </Col>
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
