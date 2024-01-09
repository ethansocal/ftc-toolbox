"use client";

import NewChatButton from "./NewChatButton";
import ChatHistory from "./ChatHistory";

export default () => {
    return (
        <>
            <div className="h-screen flex w-72 flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-4"
                        >
                            <NewChatButton />
                            <ChatHistory />
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};
