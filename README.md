# Vex Quacky 
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
This vex robot allows you to control it using your body gestures to perform several basic moves like moving forward, backward, left and right.
It's also a great project to learn Computer Vision, WiFi connection, ESP boards, UDP socket and electronics/programming in general.

## About Us
Hi, we're SESS (Seneca Engineering Student Society). We're here to make students' lives better. If you're interested in our organization at Seneca please visit or contact us through our [website](https://www.senecaengsoc.ca/about).

## Materials 
** ESP8266 ** [here to see](https://www.digikey.ca/en/products/detail/espressif-systems/ESP8266-DEVKITC-02D-F/9649768)<br />
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/esp8266.png" width="20%">

** Vex Robot ** <br />
<img src="https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/vex.png" width="20%">

## How it works
This vex is equipped with a wifi module called ESP8266 (you can use any ESP wifi module), receiving signals from the server. The server watches people's body gestures and these gestures are sent to a remote computer vision model, which will send back numerical values that can only be understood by the vex. Afterwards, ESP8266 takes these numerical data from the server to instruct the vex to move.

## How CV and body gestures work

## Set Up

### Wifi Module (Esp8266)

### Vex Robot

### Server

## Usage

## Results