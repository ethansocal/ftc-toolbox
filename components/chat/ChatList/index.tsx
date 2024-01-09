import { type Message } from "ai";
import MessageBox from "./MessageBox";

export interface ChatList {
    messages: Message[];
}

export default function ChatList({ messages }: ChatList) {
    if (!messages.length) {
        return null;
    }

    console.log(messages);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <MessageBox message={message} />
                    <div className="mt-5"></div>
                </div>
            ))}
        </div>
    );
}
