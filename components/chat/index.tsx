"use client";

import { useChat, type Message } from "ai/react";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export default ({ id, initialMessages }: ChatProps) => {
  const router = useRouter();
  const path = usePathname();

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      id,
      body: {
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
      onFinish() {
        if (!path.includes("chat")) {
          router.push(`/chat/${id}`, { scroll: false });
          router.refresh();
        }
      },
    });

  return (
    <>
      <div className={"pb-[200px] pt-4 md:pt-10"}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
          </>
        ) : (
          <>{/* <EmptyScreen setInput={setInput} /> */}</>
        )}
      </div>
      <div className="min-h-screen flex flex-col justify-between items-center">
        <div></div>{" "}
        <div className="w-full max-w-lg mb-3">
          <ChatInput
            id={id}
            isLoading={isLoading}
            stop={stop}
            append={append}
            reload={reload}
            messages={messages}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </>
  );
};
