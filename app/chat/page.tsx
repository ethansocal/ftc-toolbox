"use client";

import Chat from "@/components/chat/";
import { nanoid } from "@/lib/chat/utils";

export default () => {
  const id = nanoid();

  return <Chat id={id} />;
};
