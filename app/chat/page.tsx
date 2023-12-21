"use client";

import ChatInput from "./components/ChatInput";

export default () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <div></div>{" "}
      <div className="w-full max-w-lg mb-3">
        <ChatInput />
      </div>
    </div>
  );
};
