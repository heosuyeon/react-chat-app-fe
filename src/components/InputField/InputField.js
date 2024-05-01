import "./InputField.css";

const InputField = ({ onSubmit, name, inputRef, hiddenInputRef }) => {
  return (
    <form onSubmit={onSubmit} className="inputfield-form">
      <input
        placeholder="내용을 입력하세요"
        name={name}
        ref={inputRef}
        className="inputfield-input"
        autoFocus={true}
      />
      <input
        name="hiddenInput"
        ref={hiddenInputRef}
        className="inputfield-hidden-input"
      />
      <button className="inputfield-form-button">전송</button>
    </form>
  );
};
export default InputField;
