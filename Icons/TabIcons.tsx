/** @format */

import { View, Text } from "react-native";
import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons/";
export function ChatIcon() {
  return <Entypo name="chat" size={24} color="black" />;
}
export function MessageIcon() {
  return <Entypo name="message" size={24} color="black" />;
}
export function ProfileIcon() {
  return <AntDesign name="profile" size={24} color="black" />;
}
