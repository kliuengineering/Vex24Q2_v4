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

This vex is equipped with a wifi module called ESP8266 (you can use any ESP wifi module), receiving signals from the server. The server watches people's body gestures and these gestures are sent to a remote computer vision model, which will send back arm angles that are then converted to numerical data. These numerical data will be sent and understood by the vex. Afterwards, ESP8266 takes these numerical data from the server to instruct the vex to move.

<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/overview.jpg" width="100%">

## How CV and body gestures work

## Set Up

### Wifi Module

To install the compiler for ESP8266:

1. Install the [Arduino IDE](https://www.arduino.cc/en/software).
2. In Arduino, go to <code>Arduino IDE</code> > <code>Settings</code>. And then add this URL to the <code>Additional boards manager URLs</code>: <code>https://raw.githubusercontent.com/SpacehuhnTech/arduino/main/package_spacehuhn_index.json</code> and hit OK to save it.
3. Go to <code>Tools</code> > <code>Board</code> > <code>Boards Manager</code>. And then find and install <code>Deauther ESP8266 Boards</code>.
4. Go to <code>Tools</code> > <code>Board</code> > <code>Deauther ESP8266 Boards</code> > <code>Node MCU</code>.
5. Go to <code>Tools</code> > <code>Upload Speed</code> > <code>115200</code>.
6. In this repository, go to <code>esp8266</code> > <code>wifiConnector</code>. And then download <code>wifiConnector.ino</code>.

To get the IP address of the ESP8266:

1. Connect your laptop with the ESP.
2. In <code>wifiConnector.ino</code> file, replace your wifi name and password with their corresponding parameters.
3. Verify and download <code>wifiConnector.ino</code> to the ESP
4. Keep the ESP connected with your laptop (we want to see the IP address to log out in the your screen).
5. Press <code>RST</code> (reset) button (better do multiple times)
   Note: If you see one IP address and then you see another different one, then the first one might be your computer's IP address and the second one might be your ESP's IP address, or vice versa. You should check your wifi IP address, which should be somewhat similar to the wifi IP address that you are connecting to.

### Vex Robot

To connect ESP with VEX's uart port, please see the picture below: </br>
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/pinsconnecting.jpg" width="50%">
</br>

To set up VEX:

1. Install [ROBOTC](https://www.robotc.net/).
2. Go to <code>Robot</code> > <code>Platform type</code> > <code>Vex 2.0 Cortext</code>.
3. Go to <code>Window</code> > <code>Menu level</code> > <code>Super User</code>.
4. Set up wireless mode, please watch this [video](https://www.youtube.com/watch?v=uIAUPRrcDmk) (when a new program is loaded to VEX, we have to reboot it again. Watch this [video](https://www.youtube.com/watch?v=uIAUPRrcDmk))
5. Make sure the pins on your VEX connected to the correct motors and sensors. Our robot pins look like this:

```
#pragma config(UART_Usage, UART1, uartUserControl, baudRate115200, IOPins, None, None)
#pragma config(Sensor, dgtl8,  sonarSensor,    sensorSONAR_cm)
#pragma config(Motor,  port1,           rightmotor,    tmotorVex393_HBridge, openLoop)
#pragma config(Motor,  port10,          leftmotor,     tmotorVex393_HBridge, openLoop)
```

6. Connect VEX with your computer
7. In this repository, go to <code>Vex</code> and then download <code>SourceFile.c</code>
8. Open <code>SourceFile.c</code> on ROBOTC and hit <code>Download to Robot</code>

### Server

To set up your server:

1. In this repository, go to <code>server</code> and then download the whole server file
2. Open <code>server</code> on your laptop
3. Go to <code>pose.js</code> and replace your ESP IP address with its corresponding parameter like this <code>let IPAdress = "10.38.67.212";</code>
4. cd back to server directory and run these lines on your terminal:

```
npm install nodemon express
nodemon server.js
```

Note: the connection between ESP and VEX has to be secured first before making the connection between ESP and server
If everything is set up properly, you should be able to move the robot according to your arm angles like specified in [here](#how-cv-and-body-gestures-work)

## Results
[![Watch the video](https://img.youtube.com/vi/sTSwrwXEL7Y/maxresdefault.jpg)](https://youtu.be/sTSwrwXEL7Y)
