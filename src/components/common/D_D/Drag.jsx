import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as dropEffects from "./dropEffects";
import { addItemToTimelineBox } from "../../../store/global/global.actions";
import { useDispatch, useStore } from "react-redux";

const draggingStyle = {
    opacity: 0.25,
};

const Drag = props => {
    const [isDragging, setIsDragging] = useState(false);
    const image = useRef(null);
    const dispatch = useDispatch();
    const {getState} = useStore();

    useEffect(() => {
        image.current = null;
        if (props.dragImage) {
            image.current = new Image();
            image.current.src = props.dragImage;
        }
    }, [props.dragImage]);

    const startDrag = ev => {
        setIsDragging(true);
        console.log(props.dataItem);
        ev.dataTransfer.setData("drag-item", props.dataItem);
        ev.dataTransfer.effectAllowed = props.dropEffect;
        if (image.current) {
            ev.dataTransfer.setDragImage(image.current, 0, 0);
        }
         // addItemToTimelineBox(dispatch, getState, item.file.file, id, 0);
        //  addItemToTimelineBox(dispatch, getState, props.dataItem)
    };

    const dragEnd = () => setIsDragging(false);

    return (
        <div style={isDragging ? draggingStyle : {}} draggable onDragStart={startDrag} onDragEnd={dragEnd}>
            {props.children}
        </div>
    );
};

Drag.propTypes = {
    dataItem: PropTypes.string.isRequired,
    dragImage: PropTypes.string,
    dropEffect: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Drag.defaultProps = {
    dragImage: null,
    dropEffect: dropEffects.All,
};

export default Drag;