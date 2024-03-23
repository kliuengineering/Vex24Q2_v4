import socket


# Python UDP server to for local test.

def start_udp_server(ip, port):
    # Create a socket for UDP communication
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    # Bind the socket to the server's IP address and port
    sock.bind((ip, port))
    print(f"UDP server listening on {ip}:{port}")
    
    # Server loop: listen for messages
    while True:
        data, addr = sock.recvfrom(1024)  # Buffer size is 1024 bytes
        print(f"Received message: {data.decode()} from {addr}")

if __name__ == "__main__":
    # Example usage: Start the server on localhost port 41234
    start_udp_server('127.0.0.1', 41234)
