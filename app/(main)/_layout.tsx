/** @format */
import React from "react";
import { Tabs } from "expo-router";
import { ChatIcon, MessageIcon, ProfileIcon } from "../../Icons/TabIcons";

export default function MainLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => <ChatIcon />,
        }}
      />
      <Tabs.Screen
        name="chat/[id]"
        options={{ title: "Chat", tabBarIcon: ({ color }) => <MessageIcon /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
