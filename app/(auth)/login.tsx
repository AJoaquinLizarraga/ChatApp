/** @format */
// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../utils/useAuthStore";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useAuthStore((store) => store.signIn);
  const loading = useAuthStore((store) => store.loading);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Ambos campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await signIn(username.trim(), password);
      router.replace("/chats");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <Text className="text-2xl mb-6">Bienvenido</Text>

      {error.length > 0 && (
        <Text className="text-red-500 mb-4 text-center">{error}</Text>
      )}

      <TextInput
        className="w-full border border-gray-300 rounded p-3 mb-4"
        placeholder="Usuario"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="w-full border border-gray-300 rounded p-3 mb-6"
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        onPress={onSubmit}
        disabled={loading}
        className={`w-full rounded p-3 items-center ${
          loading ? "bg-blue-300" : "bg-blue-500"
        }`}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Entrar</Text>
        )}
      </Pressable>
    </View>
  );
}
