# Vex Quacky 
This project (named using one of professors' names) is a showcase contributing to the successor of NEM (National Engineering Month 2024) event hosted at Seneca. People can come and play with it using their body language to instruct the robots to move. This is an open source project. Feel free to download and play with the code. Even though the VEX robot sounds unaffordable, the ESP8266 is really cheap. With that in place, you can do anything related to wifi or networking in general. 

## Table of contents
- [About This Project](#about-this-project)
- [About Us](#about-us)
- [Materials](#materials)
- [How it works](#how-it-works)
- [How CV and body gestures work](#how-cv-and-body-gestures-work)
- [Set Up](#set-up)
    - [Wifi Module](#wifi-module-esp8266)
    - [Vex Robot](#vex-robot)
    - [Server](#server)
- [Usage](#usage)
- [Results](#results)

## About This Project
This vex robot allows you to control it using your body gestures to perform several basic moves like moving forward, backward, left and right. It's also a great project to learn Computer Vision, WiFi connection, ESP boards, UDP socket and electronics/programming in general.

## About Us
Hi, we're SESS (Seneca Engineering Student Society). We're here to make students' lives better. If you're interested in our organization at Seneca please visit or contact us through our [website](https://www.senecaengsoc.ca/about).

## Materials 
**ESP8266** [ here to see](https://www.digikey.ca/en/products/detail/espressif-systems/ESP8266-DEVKITC-02D-F/9649768)<br />
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/esp8266.png" width="30%">

**Vex Robot** <br />
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/vex.png" width="30%">

## How it works
This vex is equipped with a wifi module called ESP8266 (you can use any ESP wifi module), receiving signals from the server. The server watches people's body gestures and these gestures are sent to a remote computer vision model, which will send back numerical values that can only be understood by the vex. Afterwards, ESP8266 takes these numerical data from the server to instruct the vex to move.

## How CV and body gestures work

## Set Up

### Wifi Module
To install the compiler for ESP8266:
1. Install the Arduino IDE.
2. In Arduino, go to <code>Arduino IDE</code> > <code>Settings</code>. And then add this URL to the <code>Additional boards manager URLs</code>: <code>https://raw.githubusercontent.com/SpacehuhnTech/arduino/main/package_spacehuhn_index.json</code> and hit OK to save it.
3. Go to <code>Tools</code> > <code>Board</code> > <code>Boards Manager</code>. And then find and install <code>Deauther ESP8266 Boards</code>.
4. In this repository, go to <code>esp8266</code> > <code>wifiConnector</code>. And then download <code>wifiConnector.ino</code>.

To get the IP address of the ESP8266:
1. Connect your laptop with the ESP.
2. In wifiConnector.ino file, replace your wifi name and password with their corresponding parameters. 
3. Verify and download wifiConnector.ino to the ESP
4. Keep the ESP connected with your laptop (we want to see the IP address to log out in the your screen).
5. Press <code>RST</code> (reset) button (better do multiple times)
Note: if you see one IP address and then you see another different one, then the first one might be your computer's IP address and the second one might be your ESP's IP address, or vice versa. You should check your wifi IP address. It should be somewhat similar to the wifi IP address that you are connecting to.

### Vex Robot

### Server

## Usage

## Results