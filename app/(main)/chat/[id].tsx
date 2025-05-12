/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useChatStore } from "../../../utils/useChatStore";
import { Chat, Message } from "../../../types/types";
import initialData from "../../../mocks/chats.json";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chats = useChatStore((store) => store.chats);
  const setChats = useChatStore((store) => store.setChats);
  const addMessage = useChatStore((store) => store.addMessage);
  const chat = chats.find((chat) => chat.id === id) ?? null;
  const messages = chat?.messages ?? [];
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const initialChats: Chat[] = initialData.chats;

  // console.log(initialChats);
  useEffect(() => {
    if (chats.length === 0) {
      setChats(initialChats);
    }
  }, [chats.length]);

  const sendMessage = async () => {
    if (!input.trim() || !chat) return;
    const newMsg: Message = {
      sender: "You",
      content: input.trim(),
      time: new Date().toLocaleTimeString(),
    };
    const updatedMessages = [...messages, newMsg];

    addMessage(chat.id, newMsg);
    setInput("");
    flatListRef.current?.scrollToEnd();
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      className={`p-3 m-2 rounded-2xl max-w-3/4 ${
        item.sender === "You"
          ? "bg-blue-200 self-end"
          : "bg-gray-200 self-start"
      }`}>
      <Text>{item.content}</Text>
      <Text className="text-xs text-gray-500 text-right">{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100"
        keyboardVerticalOffset={90}>
        <FlatList
          data={messages}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          ref={flatListRef}
        />
        <View className="flex-row items-center p-2 bg-white">
          <TextInput
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
            placeholder="Escribe un mensaje..."
            value={input}
            onChangeText={setInput}
          />
          <Pressable
            onPress={sendMessage}
            className="bg-blue-500 p-3 rounded-full">
            <Text className="text-white font-semibold">Enviar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
