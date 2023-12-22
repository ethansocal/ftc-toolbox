import { type Message } from "ai";

export interface ChatList {
  messages: Message[];
}

export default function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <div>{message.content}</div>

          {index < messages.length - 1 && (
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
