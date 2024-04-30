import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useError = () => {
  const navigate = useNavigate();

  const errorHandler = useCallback(
    (error) => {
      switch (error) {
        case "invalid_form":
          alert("입력 항목은 필수로 입력해야 합니다.");
          break;
        case "invalid_user_name":
          alert("사용중인 사용자 이름입니다.");
          break;
        case "maximum_rooms_and_users":
          alert("채팅방 개설과 입장 수는 각 최대 3번 입니다.");
          break;
        case "maximum_rooms":
          alert("방 생성은 최대 3개 까지 입니다.");
          break;
        case "maximum_users":
          alert("채팅방 입장 가능 인원은 최대 3명 입니다.");
          break;
        case "access_restricted_user":
          alert("잘못된 접근입니다.");
          navigate("/");
          break;

        default:
          alert(error);
          break;
      }
    },
    [navigate]
  );
  return {
    errorHandler,
  };
};
