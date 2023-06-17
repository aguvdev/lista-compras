import "../App.css"
import PropTypes from "prop-types";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const ShoppingListItem = ({
  item,
  index,
  editingItem,
  name,
  quantity,
  price,
  handleNameChange,
  handleQuantityChange,
  handlePriceChange,
  handleCancelEdit,
  handleUpdate,
  editIndex,
  handleEdit,
  handleDelete,
}) => {
  return (
    <li>
      {editIndex === index ? (
        <div className="li_tagEdit">
          <div className="tag_infoEdit">
            <input className="input_field" type="text" value={name} onChange={handleNameChange} />
            <input className="input_field" type="number" value={quantity} onChange={handleQuantityChange} />
            <input className="input_field" type="number" step="0.01" value={price} onChange={handlePriceChange} />
          </div>
          <div className="buttons_containerEdit">
            <button onClick={handleCancelEdit}><DoDisturbOnOutlinedIcon /></button>
            <button onClick={() => handleUpdate(index)}><CheckOutlinedIcon /></button>
          </div>
        </div>
      ) : (
        <div className="li_tag">
          <div className="tag_info">
            <p>{item.name}</p>
            <p>
              {item.quantity}x <span>${item.price.toFixed(2)}</span>
            </p>
            <p>{(item.quantity * item.price).toFixed(2)}</p>
          </div>
          <div className="button_container">
            <button onClick={() => handleDelete(index)} className="button_delete"><DeleteForeverOutlinedIcon /></button>
            <button onClick={() => handleEdit(index)} className="button_edit"><EditNoteOutlinedIcon /></button>
          </div>
        </div>
      )}
    </li>
  );
};

ShoppingListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  editingItem: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  editIndex: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ShoppingListItem;
