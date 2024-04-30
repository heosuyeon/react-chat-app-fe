import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./screens/Home/Home";
import ChatRoom from "./screens/ChatRoom/ChatRoom";
import ErrorPage from "./screens/ErrorPage/ErrorPage";
import "./App.css";

// import socket from "./socket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat_room/:roomName",
    element: <ChatRoom />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <header>
        <h1>React 채팅 웹앱</h1>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </React.Fragment>
  );
}

export default App;
