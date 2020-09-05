import React, { useState } from "react";
import PropTypes from "prop-types";
import * as dropEffects from "./dropEffects";
import { useDispatch, useStore } from "react-redux";
import { addItemToTimelineBox } from "../../../store/global/global.actions";

const insideStyle = {
    backgroundColor: "#cccccc",
    opacity: 0.5,
    width: 100,
};

const DropTarget = props => {
    const [isOver, setIsOver] = useState(false);
    const dispatch = useDispatch();
    const {getState} = useStore();
    const dragOver = ev => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = props.dropEffect;
    };

    const drop = (ev, id) => {
        const droppedItem = JSON.parse(ev.dataTransfer.getData("drag-item"));
        if (droppedItem) {
            props.onItemDropped(droppedItem);
        }
        console.log(droppedItem);
        addItemToTimelineBox(dispatch, getState, droppedItem, id);
        setIsOver(false);
    };

    const dragEnter = ev => {
        ev.dataTransfer.dropEffect = props.dropEffect;
        setIsOver(true);
    };

    const dragLeave = () => setIsOver(false);

    return (
        <div
            onDragOver={dragOver}
            onDrop={(ev) => drop(ev, props.id)}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            style={{ display: 'flex', ...(isOver ? insideStyle : {}) }}
            id= {props.id}
        >
            {props.children}
        </div>
    );
};

DropTarget.propTypes = {
    onItemDropped: PropTypes.func.isRequired,
    dropEffect: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

DropTarget.defaultProps = {
    dropEffect: dropEffects.All,
};

export default DropTarget;