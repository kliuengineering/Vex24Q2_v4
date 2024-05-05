# Vex Quacky

This project, named using one of professors' alias, is a tribute to the NEM (National Engineering Month) event hosted at Seneca. People are welcome to play with it using their body language and instruct the VEX Clawbot . This is an open source project under MIT liscence. Feel free to download and play with the code. Even though the VEX Clawbot is somewhat outdated, the logic and design may carry on. We believe you can always make something fun out of the old stuff as long as you are willing to tinker them a bit.

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
This vex robot allows you to control it using your body gestures using your laptop's front-facing camera. The basic moves include moving forward, backward, left, right, and rotations. It is a great starting point to see how AI -> Computer Vision, embedded system, Linux kernel programming, and physical design come together.

## About Us
We are members from the SESS (Seneca Engineering Student Society). Our goal is to inject bits of fun into the dryness from studying theoretical knowledge about eneigneering. If you're interested in our organization then contact us through our [website](https://www.senecaengsoc.ca/about).

## Bill of Material
**ESP8266** [ here to see](https://www.digikey.ca/en/products/detail/espressif-systems/ESP8266-DEVKITC-02D-F/9649768)<br />
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/esp8266.png" width="30%">
**Vex Clawbot** <br/>
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/vex.png" width="30%">

## How it works
This vex is equipped with a wifi module called ESP8266 (you can use any ESP wifi module), receiving signals from the server. The server watches people's body gestures and these gestures are sent to a remote computer vision model, which will send back arm angles that are then converted to numerical data. These numerical data will be sent and understood by the vex. Afterwards, ESP8266 takes these numerical data from the server to instruct the vex to move.
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/overview.jpg" width="100%">

## How CV and body gestures work (under construction...)

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

### Server Setup
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

## Project Display
[![Watch the video](https://img.youtube.com/vi/sTSwrwXEL7Y/maxresdefault.jpg)](https://youtu.be/sTSwrwXEL7Y)
[![Watch the video](https://img.youtube.com/vi/WILRiR3Iy-k/maxresdefault.jpg)](https://youtu.be/WILRiR3Iy-k)
[![Watch the video](https://img.youtube.com/vi/QYvtNvOW2qE/maxresdefault.jpg)](https://youtu.be/QYvtNvOW2qE)
[![Watch the video](https://img.youtube.com/vi/sdp-0wns2wo/maxresdefault.jpg)](https://youtu.be/sdp-0wns2wo)



