"use client";

import Chat from "./Chat";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { experimental_useAssistant as useAssistant } from "ai/react";

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

    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState(null);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                throw error;
            }

            if (data) {
                setAvatarUrl(data.user.user_metadata.avatar_url);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <Chat
            messages={messages}
            avatar_url={avatar_url}
            submitMessage={submitMessage}
            handleInputChange={handleInputChange}
            input={input}
            status={status}
        />
    );
};
