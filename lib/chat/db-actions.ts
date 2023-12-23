import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  return await prisma.chat.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
    },
  });
};

const getChats = async (userId: string) => {
  return await prisma.chat.findMany({
    where: {
      userId,
    },
  });
};

const createChat = async ({ id, title, userId }: ChatProps) => {
  return await prisma.chat.create({
    data: {
      id,
      title,
      userId,
    },
  });
};

const addMessage = async ({ content, role, chatId }: MessageProps) => {
  return await prisma.message.create({
    data: {
      content,
      role,
      chatId,
    },
  });
};

export { getChat, getChats, createChat, addMessage };
