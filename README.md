# Vex Quacky 
- [About This Project](#about-this-project)
- [About Us](#about-us)
- [Materials](#materials)
- [How it works](#how-it-works)
- [CV and body gesture are simple](#cv-and-body-gesture-are-simple)
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
ESP8266 (any ESP wifi module is fine) <br />

![esp8266](https://raw.githubusercontent.com/kliuengineering/Vex24Q2_v4/main/pics/esp8266.png)

Vex Robot (you can borrow your school for this) <br />
![vex](https://i.pinimg.com/564x/db/2e/6e/db2e6e4c0caa701cbc1bda5f37cce8d4.jpg)

## How it works
This vex is equipped with a wifi module called ESP8266 (you can use any ESP wifi module), receiving signals from the server. The server watches people's body gestures and these gestures are sent to a remote computer vision model, which will send back numerical values that can only be understood by the vex. Afterwards, ESP8266 takes these numerical data from the server to instruct the vex to move.

## CV and body gesture are simple

## Set Up

### Wifi Module (Esp8266)

### Vex Robot

### Server

## Usage

## Results