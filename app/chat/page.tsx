"use client";

import ChatInput from "./components/ChatInput";
import withTheme from "../../theme";

export default () => {
  return withTheme(
    <div>
      <ChatInput />
    </div>
  );
};
