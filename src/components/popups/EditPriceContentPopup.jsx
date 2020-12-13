import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, message } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual, useDispatch, useStore } from 'react-redux';

import RedactorHeader from '../common/RedactorHeader';
import ShopSelector from '../common/ShopSelector';
import ScheduleColHeader from '../common/schedule/ScheduleColHeader';
import ScheduleItem from '../common/schedule/ScheduleItem';
import { reorder, move } from './helpers';
import { addProductsToScreens, getProducts } from '../../store/global/global.actions';

const EditPriceContentPopup = ({ visible, handleCancel, shopId, templateId }) => {
    const { tvCount, selectedShop, products } = useSelector(s => s.global, shallowEqual);
    const dispatch = useDispatch();
    const [localSelectedShop, setLocalSelectedShop] = useState(null);
    const [tvS, setTvS] = useState([]);
    const [product, setProduct] = useState(null);
    const { getState } = useStore();
    // const templateId = getState().global.template_id;
    useEffect(() => {
        setLocalSelectedShop(selectedShop);;
        // getProducts(dispatch, selectedShop?.id, templateId);
    }, []);
    if (products && !product) {
        const _ = [];
        const obj = {
            product_0: products.filter(p => p.screen == null),
        }
        for (let i = 1; i < tvCount + 1; i++) {
            _.push(`TV-${i}`);
            obj[`product_${i}`] = products.filter(p => p.screen == i);
        }
        setTvS(_);
        setProduct(obj);
    }

    const handleChange = (e) => {
        setLocalSelectedShop(e.target.value);
    };

    const handleCancelChanges = () => {
        handleCancel();
    };
    const handlSave = () => {
        addProductsToScreens(product, templateId);
    };
    const canSave = true;

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            message.error('You dropped outside the list');
            return;
        }
        const sInd = +source.droppableId.split('droppable-')[1];
        const dInd = +destination.droppableId.split('droppable-')[1];

        if (sInd == dInd) {
            const items = reorder(product[`product_${sInd}`], source.index, destination.index);
            setProduct({ ...product, [`product_${sInd}`]: items });
        } else {
            const result = move(product[`product_${sInd}`], product[`product_${dInd}`], source, destination);

            setProduct({
                ...product,
                [`product_${sInd}`]: [...result[`droppable-${sInd}`]],
                [`product_${dInd}`]: [...result[`droppable-${dInd}`]],
            });
        }
    }

    return (
        selectedShop && <Modal
            visible={visible}
            footer={null}
            header={null}
            closable={false}
            className='edit-priceContent-modal'
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
                    onDragEnd={(r) => handleDragEnd(r)}
                >
                    <div style={{ width: 100 / (tvCount + 1) - 2 + '%' }} className={'content-col'} key={name}>
                        <ScheduleColHeader
                            name='Не сортированные'
                        />
                        <div className='schedule-items-container'>
                            <Droppable droppableId={`droppable-0`}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {product.product_0 && product.product_0.map((product, j) => {
                                            return <>
                                                <Draggable draggableId={`draggable-0_${(j + 1)}`} index={j}>
                                                    {(provided) => (
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
                        return <div style={{ width: 100 / (tvCount + 1) - 2 + '%' }} className={'content-col'} key={name}>
                            <ScheduleColHeader
                                name={name}
                            />
                            <div className='schedule-items-container'>
                                <Droppable droppableId={`droppable-${i + 1}`}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {product[`product_${i + 1}`].map((p, j) => {
                                                return <>
                                                    <Draggable draggableId={`draggable-${(i + 1) + '_' + (j + 1)}`} index={j}>
                                                        {(provided) => (
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
                <button className='react-button cancel-btn' onClick={handleCancelChanges}>Отмена</button>
                <button
                    className={`react-button save-btn yellow-btn ${canSave ? '' : 'disabled-btn'}`}
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
