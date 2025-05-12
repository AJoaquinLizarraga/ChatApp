/** @format */

// src/store/useChatStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat, Message } from "../types/types";

interface ChatState {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addMessage: (chatId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],

      setChats: (chats) => set({ chats }),

      addMessage: (chatId, message) => {
        const { chats } = get();
        const updated = chats.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...(c.messages || []), message],
                lastMessage: message.content,
                time: message.time,
              }
            : c
        );
        set({ chats: updated });
      },
    }),
    {
      name: "@MyApp/chats",
    }
  )
);
