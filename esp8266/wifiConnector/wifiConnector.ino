
#include <ESP8266WiFi.h>
#include <WiFiUDP.h>
#include <cstring>

const char *ssid = "Linksys00321";
const char *password = "fxjz26padu";

WiFiUDP udp;
unsigned int port = 4210;                              // Local port to listen on
char incomingPacket[255];                              // Buffer for incoming packets
char replyPacket[] = "Hi there! Got the message :-)";  // A reply string to send back

void setup() {
  Serial.begin(115200);
  // Set up the ESP32 as an Access Point
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    // Serial.print(".");
  }

  Serial.println("Connected to Wi-Fi. IP address: ");
  Serial.println(WiFi.localIP());

  // Start UDP
  udp.begin(port);
  // Serial.printf("UDP server started at IP %s, port %d\n", WiFi.localIP().toString().c_str(), port);
}

void loop() {
  int packetSize = udp.parsePacket();
  if (packetSize) {
    // Receive incoming UDP packets
    // Serial.printf("Received %d bytes from %s, port %d\n", packetSize, udp.remoteIP().toString().c_str(), udp.remotePort());
    int len = udp.read(incomingPacket, 255);
    if (len > 0) {
      incomingPacket[len] = 0;  // Null-terminate the string
    }
    // Serial.printf("UDP packet contents: %s\n", incomingPacket);

    // Write the received data to UART
    Serial.write(incomingPacket);

    // Optionally, send a reply to the sender
    // Optionally, send a reply to the sender
    udp.beginPacket(udp.remoteIP(), udp.remotePort());
    udp.write((uint8_t *)replyPacket, strlen(replyPacket));  // Corrected line
    udp.endPacket();
  }
}
