import { type Message } from "ai";

export interface ChatList {
  messages: Message[];
}

export default function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <div className={"group relative mb-4 flex items-start md:-ml-12"}>
            <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
              {message.content}
            </div>
          </div>

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
