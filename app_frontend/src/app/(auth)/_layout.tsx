import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="ClientRegistration" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="ResetPassword" />
    </Stack>
  );
}
