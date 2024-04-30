import "./IconButton.css";

const IconButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="icon-button"
      style={{ backgroundImage: `url(${props.iconSrc})` }}
    >
      {props.children}
    </button>
  );
};
export default IconButton;
