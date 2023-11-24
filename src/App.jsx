import { useState, useEffect } from "react";
import ShoppingListItem from "./components/ShoppingListItem";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

import "./App.css"

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    calculateTotalPrice(items);
  }, [items]);

  useEffect(() => {
    const storedItems = localStorage.getItem("shoppingListItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    calculateTotalPriceOnLoad();
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingListItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    calculateTotalPrice(items);
  }, [items]);

  const calculateTotalPriceOnLoad = () => {
    calculateTotalPrice(items);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if (name && quantity && price) {
      const newItem = {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };

      setItems([...items, newItem]);
      setTotalPrice(totalPrice + parseFloat(price) * parseInt(quantity));
      setName("");
      setQuantity("");
      setPrice("");
    }
  }; */

  const handleAdd = (e) => {
    e.preventDefault();
    if (name && quantity && price) {
      const newItem = {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };
  
      // Unshift the new item to the beginning of the array
      setItems([newItem, ...items]);
      // Calculate the total price
      calculateTotalPrice([...newItem, ...items]);
  
      // Clear input fields
      setName("");
      setQuantity("");
      setPrice("");
    }
  };

  const handleEdit = (index) => {
    const item = items[index];
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity.toString());
    setPrice(item.price.toString());
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setName("");
    setQuantity("");
    setPrice("");
    setEditIndex(-1);
  };

  const handleUpdate = (index) => {
    if (name && quantity && price) {
      const updatedItem = {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };

      const updatedItems = [...items];
      updatedItems[index] = updatedItem;
      setItems(updatedItems);
      setEditingItem(null);
      setEditIndex(-1);
      calculateTotalPrice(updatedItems);
      setName("");
      setQuantity("");
      setPrice("");
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    setTotalPrice(total);
  };

  return (
    <div className="app">
      <h1 className="title_app">Lista de Compras</h1>
      <form onSubmit={handleAdd} className="add_input">
        <p className="totalPrice">${totalPrice.toFixed(2)}</p>
        <input
          className="input_field"
          placeholder="Producto"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          className="input_field"
          placeholder="Cantidad"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          required
        />
        <input
          className="input_field"
          placeholder="Precio"
          type="number"
          step="0.01"
          value={price}
          onChange={handlePriceChange}
          required
        />
        <button type="submit" className="button_style"><AddShoppingCartRoundedIcon /></button>
      </form>
      <ul>
        {items
          .slice()
          .map((item, index) => (
            <ShoppingListItem
              key={index}
              item={item}
              index={index}
              editingItem={editingItem}
              name={name}
              quantity={quantity}
              price={price}
              handleNameChange={handleNameChange}
              handleQuantityChange={handleQuantityChange}
              handlePriceChange={handlePriceChange}
              handleCancelEdit={handleCancelEdit}
              handleUpdate={handleUpdate}
              editIndex={editIndex}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
