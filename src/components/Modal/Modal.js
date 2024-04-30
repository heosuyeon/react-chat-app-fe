import React from "react";
import ReactDom from "react-dom";

import "./Modal.css";

const Modal = (props) => {
  const content = (
    <dialog
      ref={props.dialogRef}
      open={props.open}
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header className={`modal_header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal_content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal_footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </dialog>
  );
  return ReactDom.createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;
