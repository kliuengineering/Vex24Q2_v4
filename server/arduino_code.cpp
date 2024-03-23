#include <WiFi.h>
#include <WiFiUDP.h>
#include <cstring>

const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

WiFiUDP udp;
unsigned int localUdpPort = 4210;  // Local port to listen on
char incomingPacket[255];  // Buffer for incoming packets
char  replyPacket[] = "Hi there! Got the message :-)";  // A reply string to send back

void setup() {
  Serial.begin(115200);
  
  // Set up the ESP32 as an Access Point
  WiFi.softAP(ssid, password);
  Serial.print("Access Point Started. IP Address: ");
  Serial.println(WiFi.softAPIP());

  // Start UDP
  udp.begin(localUdpPort);
  Serial.printf("UDP server started at IP %s, port %d\n", WiFi.softAPIP().toString().c_str(), localUdpPort);
}

void loop() {
  int packetSize = udp.parsePacket();
  if (packetSize) {
    // Receive incoming UDP packets
    Serial.printf("Received %d bytes from %s, port %d\n", packetSize, udp.remoteIP().toString().c_str(), udp.remotePort());
    int len = udp.read(incomingPacket, 255);
    if (len > 0) {
      incomingPacket[len] = 0;  // Null-terminate the string
    }
    Serial.printf("UDP packet contents: %s\n", incomingPacket);

    // Write the received data to UART
    Serial.write(incomingPacket);

    // Optionally, send a reply to the sender
    // Optionally, send a reply to the sender
    udp.beginPacket(udp.remoteIP(), udp.remotePort());
    udp.write((uint8_t *)replyPacket, strlen(replyPacket)); // Corrected line
    udp.endPacket();

  }
}
