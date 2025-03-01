const { Stack } = require("expo-router");

const NoteLayout = () => {
  return (
    <Stack
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: "black",

      },
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
    />
  );
};

export default NoteLayout;
