import prisma from "@/lib/db";

interface ChatProps {
    id: string;
    title: string;
    userId: string;
}

interface MessageProps {
    content: string;
    role: string;
    chatId: string;
}

const getChat = async (id: string) => {
    return prisma.chat.findUnique({
        where: {
            id,
        },
        include: {
            messages: true,
        },
    });
};

const getChats = async (userId: string) => {
    return prisma.chat.findMany({
        where: {
            userId,
        },
    });
};

const createChat = async ({ id, title, userId }: ChatProps) => {
    return prisma.chat.create({
        data: {
            id,
            title,
            userId,
        },
    });
};

const addMessage = async ({ content, role, chatId }: MessageProps) => {
    return prisma.message.create({
        data: {
            content,
            role,
            chatId,
        },
    });
};

export { getChat, getChats, createChat, addMessage };
