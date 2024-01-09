import { type UseChatHelpers } from "ai/react";

import StopButton from "./StopButton";
import SendButton from "./SendButton";

export interface ChatPanelProps
    extends Pick<
        UseChatHelpers,
        | "append"
        | "isLoading"
        | "reload"
        | "messages"
        | "stop"
        | "input"
        | "setInput"
    > {
    id?: string;
    title?: string;
}

export default ({
    id,
    title,
    isLoading,
    stop,
    append,
    reload,
    input,
    setInput,
    messages,
}: ChatPanelProps) => {
    return (
        <div className="min-w-0 flex-1 rounded-xl shadow-sm ring-1 ring-inset ring-gray-500 p-2">
            <form
                className="relative"
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (!input?.trim()) {
                        return;
                    }
                    setInput("");

                    await append({
                        id,
                        content: input,
                        role: "user",
                    });
                }}
            >
                <div className="flex justify-between items-center">
                    <label htmlFor="message" className="sr-only">
                        Message Centerstage AI...
                    </label>
                    <textarea
                        rows={1}
                        name="message"
                        id="message"
                        className="flex-grow block w-full resize-none border-0 bg-transparent py-1.5 text-white-800 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Message Centerstage AI..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ maxHeight: "5em", overflow: "auto" }}
                    />

                    {isLoading ? <StopButton stop={stop} /> : <SendButton />}
                </div>
            </form>
        </div>
    );
};
