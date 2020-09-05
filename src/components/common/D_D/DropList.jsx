import React, { useState } from "react";
import DropTarget from "./DropTarget";

const DropList = ({ children }) => {
    const [items, setItems] = useState([]);

    const itemDropped = item => setItems([...items, item]);
    return (
        <DropTarget onItemDropped={itemDropped} dropEffect="copy">
            {children}
        </DropTarget>
    );
};
export default DropList;