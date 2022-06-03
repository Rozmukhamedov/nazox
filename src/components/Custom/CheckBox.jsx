import "./checkbox.css";

function CheckBox({ label, id, onChange, onSale, setOnSale }) {
  const changeCheckBox = () => {
    onChange(id);
    setOnSale(!onSale);
  };
  return (
    <div className="check_box">
      <label className="check_box_label">
        <input type="checkbox" checked={onSale} onChange={changeCheckBox} />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
