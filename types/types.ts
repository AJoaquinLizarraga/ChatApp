/** @format */

export type Message = {
  sender: "You" | "Them";
  content: string;
  time: string;
};

export type Chat = {
  id: string;
  contact: string;
  lastMessage: string;
  time: string;
  messages: Message[];
};
