import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.0.7:3001"); // ⚠️ СМЕНИ IP

    ws.current.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && ws.current) {
      ws.current.send(message);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item}</Text>
        )}
      />

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Введите сообщение"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>ОТПРАВИТЬ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // ✅ фон
    padding: 10,
  },
  list: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    backgroundColor: "#1e1e1e", // ✅ пузырь
    color: "#fff", // ✅ БЕЛЫЙ ТЕКСТ (ВАЖНО)
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196f3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});