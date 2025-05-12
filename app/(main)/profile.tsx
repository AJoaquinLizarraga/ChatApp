/** @format */

import React, { memo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuthStore } from "../../utils/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const updateUsername = useAuthStore((s) => s.setUsername);

  const [username, setUsername] = useState(user?.username || "");

  const saveProfile = () => {
    updateUsername(username.trim());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100 p-6"
        keyboardVerticalOffset={90}>
        <View className="bg-white rounded-2xl p-6 shadow-md">
          <Text className="text-2xl font-bold mb-4">Perfil</Text>

          <Text className="text-gray-500 mb-2">Username:</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Escribe tu username"
          />

          <Pressable
            onPress={saveProfile}
            className="bg-green-500 rounded-lg px-4 py-3 mb-4">
            <Text className="text-center text-white font-semibold">
              Guardar
            </Text>
          </Pressable>

          <Pressable
            onPress={signOut}
            className="bg-red-500 rounded-lg px-4 py-3">
            <Text className="text-center text-white font-semibold">
              Cerrar sesión
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default memo(ProfileScreen);
