import { useState, useEffect } from "react";
import "./App.css";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

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

  const handleSubmit = (e) => {
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
  };

  const handleEdit = (index) => {
    const item = items[index];
    setName(item.name);
    setQuantity(item.quantity.toString());
    setPrice(item.price.toString());
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
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
      setEditIndex(-1);
      calculateTotalPrice(updatedItems);
      setName("");
      setQuantity("");
      setPrice("");
    }
  };

  const handleDelete = (index) => {
    /* const deletedItem = items[index]; */
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
    <div>
      <h1 className="title_app">Lista de Compras</h1>
      <>
        <form onSubmit={handleSubmit} className="add_input">
          <p className="totalPrice">Total: ${totalPrice.toFixed(2)}</p>
          <input
            placeholder="Producto"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />

          <input
            placeholder="Cantidad"
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />

          <input
            placeholder="Precio"
            type="number"
            step="0.01"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />

          <button className="button_style" type="submit">Agregar</button>
        </form>
      </>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <div>
                  <input type="text" value={name} onChange={handleNameChange} />
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={handlePriceChange}
                  />
                  <button onClick={handleCancelEdit}>Cancelar</button>
                  <button onClick={() => handleUpdate(index)}>
                    Actualizar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="leftSide_li">
                  <p>{item.name}</p>
                  <p>
                    {item.quantity}x <span>${item.price.toFixed(2)}</span>
                  </p>
                </div>
                <div className="buttons_edit_delete">
                  <button className="button_style button_edit" onClick={() => handleEdit(index)}>Editar</button>
                  <button className="button_style button_delete" onClick={() => handleDelete(index)}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
