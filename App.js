import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import React from "react";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />

      <StatusBar style="auto" />
    </Provider>
  );
}