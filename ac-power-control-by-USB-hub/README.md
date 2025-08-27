# AC Power control by USB

So we want to control power management of a USB hub. Basically to turn it ON/OFF.

## some background info

Original source code is at [gniibe.org/oitoite/ac-power-control-by-USB-hub/hub-ctrl.c](https://www.gniibe.org/oitoite/ac-power-control-by-USB-hub/hub-ctrl.c).

Doc site is at [gniibe.org/development/ac-power-control-by-USB-hub/](https://www.gniibe.org/development/ac-power-control-by-USB-hub/).

Reference from `sudo aptitude show uhubctl`:

```text
Package: uhubctl
Version: 2.6.0-1

  Utility to control USB power per-port on smart USB hubs. Smart hub is defined as one that implements per-port power switching.
  Original idea for this code was inspired by hub-ctrl.c by Niibe Yutaka: http://www.gniibe.org/development/ac-power-control-by-USB-hub

Homepage: https://github.com/mvp/uhubctl
```

## to test

Need to get the correct device first. For example:

1. https://brain.com.ua/ukr/Koncentrator_D-Link_DUB-H7-p16447.html?srsltid=AfmBOorx8PAwLf7Vowu0jnPGcXPFid_YSw3YzK0LEdI3zEQnxrKRZtTO
2. https://rozetka.com.ua/ua/476327849/p476327849/
3. https://comtrade.ua/d-link-dub-h7-vytryna/

Or just google `D-Link DUB-H7 7 Port`.

## to build

```shell
sudo aptitude install gcc libusb-dev
gcc hub-ctrl.c -lusb -o hub-ctrl
```
