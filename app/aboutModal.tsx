import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import data from "./../app.json";

export default function AboutModalScreen() {
  const appData = data?.expo;

  if (!appData) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.text}>Name: {appData.name}</Text>
      <Text style={styles.text}>App version: {appData.version}</Text>
      <Text style={styles.text}>Contact: random@e.mail</Text>
      <Text style={styles.text}>Report a bug: random2@e.mail</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
