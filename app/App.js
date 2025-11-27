import { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        // Замените 192.168.1.5 на IP вашего сервера
        const socket = new WebSocket("ws://192.168.0.12:5000");

        socket.onmessage = (event) => {
            setMessages(prev => [...prev, event.data]);
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const send = () => {
        if (ws && text.trim()) {
            ws.send(text.trim());
            setText("");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.chat}>
                {messages.map((m, i) => (
                    <Text key={i} style={styles.message}>{m}</Text>
                ))}
            </ScrollView>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Сообщение"
                />
                <Button title="Отправить" onPress={send} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, marginTop: 40 },
    chat: { flex: 1, borderWidth: 1, padding: 10 },
    message: { marginVertical: 4 },
    inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 8 }
});