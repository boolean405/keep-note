import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const LoginScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {isRegistering ? "Register" : "Login"}
        </Text>
        <Text style={styles.subTitleText}>K Khay Account</Text>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />
        <TouchableOpacity>
          <Text style={styles.button} onPress={() => router.push("/note")}>
            {isRegistering ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.link}>Forgot Password?</Text>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  login: {
    width: "100%", // Ensure it takes full width inside the container
    maxWidth: 400, // Optional: Set a max width for the form
    alignItems: "center", // Center the inner elements horizontally
    padding: 20, // Padding for the form elements
    backgroundColor: "white", // Optional: Background color to make it stand out
    borderRadius: 10, // Optional: Rounded corners for form
    elevation: 5, // Optional: Add shadow for Android devices
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 15,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
  },
  button: {
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  link: {
    marginTop: 10,
    color: "blue", // Style links with a different color
  },
});

export default LoginScreen;
