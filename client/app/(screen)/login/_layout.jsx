const { Stack } = require("expo-router");

const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default LoginLayout;
