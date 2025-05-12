/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useChatStore } from "../../utils/useChatStore";
import { Chat } from "../../types/types";
import { SafeAreaView } from "react-native-safe-area-context";

const initialChats: Chat[] = [
  {
    id: "1",
    contact: "John",
    lastMessage: "Hey, how are you?",
    time: "10:00 AM",
    messages: [],
  },
  {
    id: "2",
    contact: "Alice",
    lastMessage: "See you soon!",
    time: "09:30 AM",
    messages: [],
  },
];

const ChatsScreen = () => {
  const chats = useChatStore((s) => s.chats);
  const setChats = useChatStore((s) => s.setChats);
  const router = useRouter();

  useEffect(() => {
    if (chats.length === 0) {
      setChats(initialChats);
    }
  }, [chats]);

  const renderItem = ({ item }: { item: Chat }) => (
    <Pressable
      onPress={() => router.push(`/chat/${item.id}`)}
      className="flex-row justify-between items-center p-4 border-b border-gray-200">
      <View>
        <Text className="text-lg font-medium">{item.contact}</Text>
        <Text className="text-gray-500">{item.lastMessage}</Text>
      </View>
      <Text className="text-gray-400">{item.time}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;
