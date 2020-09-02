import React from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const Box = ({ isDragging, connectDragSource, children, file }) => {
  const opacity = isDragging ? 0.4 : 1;
  console.log(file);
  return connectDragSource(<div style={{ opacity }}>{children}</div>)
}
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: (props) => ({ name: props.name }),
    endDrag(props, monitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();
      console.log(item);
      if (dropResult) {
        let alertMessage = ''
        const isDropAllowed =
          dropResult.allowedDropEffect === 'copy' ||
          dropResult.allowedDropEffect === dropResult.dropEffect
        if (isDropAllowed) {
          const isCopyAction = dropResult.dropEffect === 'copy'
          const actionName = isCopyAction ? 'copied' : 'moved'
          alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
        } else {
          alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
        }
        alert(alertMessage)
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
