import React from "react";
import Modal from "./Modal";

const CreateRoomModal = (props) => {
  return (
    <Modal
      dialogRef={props.modalRef}
      onCancel={props.onCancel}
      onSubmit={props.onSubmit}
      header="새로운 채팅방 만들기"
      footer={
        <React.Fragment>
          <button type="submit" className="confirm-button">
            만들기
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={props.onCancel}
          >
            취소
          </button>
        </React.Fragment>
      }
    >
      <div className="form-input">
        <label htmlFor="roomName">방 이름</label>
        <input id="roomName" name="roomName" />
      </div>
      <div className="form-input">
        <label htmlFor="userName">당신의 이름</label>
        <input id="userName" name="userName" />
      </div>
    </Modal>
  );
};
export default CreateRoomModal;
