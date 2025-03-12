import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "bold",
        },
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: "white",
        },
      }}
    >
      {/* <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="note" options={{ headerTitle: "Note" }} /> */}
    </Stack>
  );
};

export default RootLayout;
