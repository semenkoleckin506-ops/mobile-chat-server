import socket
import threading

HOST = "0.0.0.0"  # Локальный хост
PORT = 5000

clients = []


def handle_client(conn, addr):
    print(f"[+] Подключился {addr}")
    clients.append(conn)

    while True:
        try:
            msg = conn.recv(1024)
            if not msg:
                break

            for c in clients:
                if c != conn:
                    c.send(msg)

        except:
            break

    print(f"[-] Отключился {addr}")
    clients.remove(conn)
    conn.close()


def start():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, PORT))
    server.listen()
    print(f"[SERVER] Запущен на {HOST}:{PORT}")

    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()


start()
