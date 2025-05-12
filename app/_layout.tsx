/** @format */
import React from "react";
import { Slot, Redirect, usePathname } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { useAuthStore } from "../utils/useAuthStore";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthGate />
    </SafeAreaProvider>
  );
}

function AuthGate() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const path = usePathname();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!user && !path.startsWith("/login")) {
    return <Redirect href="/login" />;
  }

  if (user && path.startsWith("/login")) {
    return <Redirect href="/chats" />;
  }

  return <Slot />;
}
