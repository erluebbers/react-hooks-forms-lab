import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";


function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")
  const [itemName, setItemName] = useState("")
  const [itemCategory, setItemCategory] = useState("Produce")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newItem = { id: uuid(), name: itemName, category: itemCategory}
    const dataArray = [...items, newItem]
  }

  function handleItemName(event) {
    setItemName(event.target.value)
  }

  function handleItemCategory(event) {
    setItemCategory(event.target.value)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  }).filter(item => item.name.toUpperCase().includes(search.toUpperCase()));


  return (
    <div className="ShoppingList">
      <ItemForm 
        onItemFormSubmit={handleSubmit} 
        ItemName={itemName}
        ItemCategory={itemCategory} 
        handleItemName={handleItemName}
        handleItemCategory={handleItemCategory}
      />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={setSearch} search={search} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
