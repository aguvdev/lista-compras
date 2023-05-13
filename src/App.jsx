import { useState, useEffect } from "react";

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
      <h2>Lista de Compras</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Producto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          required
        />

        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          step="0.01"
          id="price"
          value={price}
          onChange={handlePriceChange}
          required
        />

        <button type="submit">Agregar</button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
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
                <button onClick={() => handleUpdate(index)}>Actualizar</button>
              </>
            ) : (
              <>
                <span>
                  {item.name} - Cantidad: {item.quantity} - Precio: $
                  {item.price.toFixed(2)}
                </span>
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default ShoppingList;
