# react-chat-app-fe

실시간 채팅 웹 애플리케이션 입니다.\
이 레포지토리는 프로젝트의 front(client) 부분입니다.

<p style="display=flex">
  <img src="https://img.shields.io/badge/node.js%20-v18.3.0%20-5FA04E?style=flat-square" />
  <img src="https://img.shields.io/badge/react%20-v18.3.1%20-61DAFB?style=flat-square" />
  <img src="https://img.shields.io/badge/socket.io%20-v4.7.5%20-010101?style=flat-square" />
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa" />
</p>
    
## 개발 기간
24.3.29 ~ 24.5.3

## 배포
[배포 링크](https://heosuyeon.github.io/react-chat-app-fe/)

## 기능
#### 채팅방 생성시
![react-chat-app create room](https://github.com/heosuyeon/react-chat-app-fe/assets/91523662/c8edb264-17d4-4c24-b9f1-b1decfe5e893)

#### 채팅방 입장시
![react-chat-app enter room](https://github.com/heosuyeon/react-chat-app-fe/assets/91523662/18f37d92-a265-437d-b548-b31135dd4f6d)

- 채팅방 이름과 닉네임을 입력 후 채팅방을 만들 수 있습니다. (최대 방 생성 개수 3개)
- 기존 채팅방이 있다면 닉네임을 입력하고 입장할 수 있습니다. (최대 입장 인원 3명)
- 같은 방 안에서 중복 닉네임을 사용할 수 없습니다. 
- 채팅방에 참여 중인 유저 목록과 인원수를 확인할 수 있습니다.
- [PWA(Progressive Web Apps)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)  적용: 앱을 설치하여 이용할 수 있습니다.
  - 모바일 설치 화면\
![모바일 설치 화면](https://github.com/heosuyeon/react-chat-app-fe/assets/91523662/4ece9b23-4ef2-4f8c-a43c-063932d41e51)

  - 데스크톱 설치 화면\
![데스크톱 설치 화면](https://github.com/heosuyeon/react-chat-app-fe/assets/91523662/efbe72d7-7563-4302-a7b1-5f7c82208eff)

## 실행 방법
1. 레포지토리 클론
```
git clone https://github.com/heosuyeon/react-chat-app-fe.git
cd react-chat-app-fe
```
2. 패키지 설치
```
npm install
```
 
4. 개발모드 실행
```
npm start
```
