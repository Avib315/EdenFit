import React, { useState } from "react";
import type { IListProps } from "@/interfaces/IModels";
import "./style/style.scss";

const List: React.FC<IListProps> = ({
  items,
  onSelect,
  selectable = false,
  multiSelect = false,
  className = "",
}) => {
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

  const handleItemClick = (itemId: string | number) => {
    if (!selectable) return;

    let newSelectedItems: (string | number)[] = [];

    if (multiSelect) {
      if (selectedItems.includes(itemId)) {
        newSelectedItems = selectedItems.filter((id) => id !== itemId);
      } else {
        newSelectedItems = [...selectedItems, itemId];
      }
    } else {
      newSelectedItems =
        selectedItems.includes(itemId) ? [] : [itemId];
    }

    setSelectedItems(newSelectedItems);

    const selectedItem = items.find((item) => item.id === itemId);
    if (selectedItem) {
      onSelect?.(selectedItem);
    }
  };

  return (
    <div className={`list ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`list-item ${
            selectedItems.includes(item.id) ? "list-item-selected" : ""
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          {item.icon && <span className="list-item-icon">{item.icon}</span>}
          <div className="list-item-content">
            <div className="list-item-label">{item.label}</div>
            {item.description && (
              <div className="list-item-description">{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
