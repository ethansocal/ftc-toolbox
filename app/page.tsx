"use client";

import Chat from "./chat/Chat";
import { experimental_useAssistant as useAssistant } from "ai/react";
import { useProfile } from "@/hooks/useProfile";

export default () => {
    const {
        status,
        messages,
        input,
        submitMessage,
        handleInputChange,
        error,
        threadId,
    } = useAssistant({
        api: "/api/chat",
    });

    const { loading, user } = useProfile();

    return (
        <Chat
            messages={messages}
            user={user}
            submitMessage={submitMessage}
            handleInputChange={handleInputChange}
            input={input}
            status={status}
        />
    );
};
