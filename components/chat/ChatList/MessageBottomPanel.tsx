import { type Message } from "ai";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default ({
    message,
    isAssistant,
}: {
    message: Message;
    isAssistant: boolean;
}) => {
    return (
        <div className="mt-2">
            {isAssistant ? (
                <>
                    <ClipboardIcon
                        className="w-4 h-4 hover:cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText(message.content);
                        }}
                    />
                </>
            ) : (
                <></>
            )}
        </div>
    );
};
