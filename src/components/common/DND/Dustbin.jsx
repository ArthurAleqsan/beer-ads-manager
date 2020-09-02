import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Dustbin = ({ canDrop, isOver, allowedDropEffect, connectDropTarget, children, contentRow }) => {
    const isActive = canDrop && isOver
    // let backgroundColor = '#222'
    if (isActive) {
        console.log(contentRow);
    //   backgroundColor = 'darkgreen'
    } else if (canDrop) {
    //   backgroundColor = 'darkkhaki'
    }
    return connectDropTarget(children)
  }

export default DropTarget(
    ItemTypes.BOX,
    {
      drop: ({ allowedDropEffect }) => ({
        name: `${allowedDropEffect} Dustbin`,
        allowedDropEffect,
      }),
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  )(Dustbin)
