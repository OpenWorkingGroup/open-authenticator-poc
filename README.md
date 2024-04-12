https://shields.io

# Open Authenticator

The no-frills purpose built multi-platform multi-factor open source authentication application.

## Installation

Search for Open Authenticator in your device or operating systems app store: iPhone, Android, MacOS, Windows, Linux.

OSX: `brew install open-authenticator`

Windows: `choco install open-authenticator`

Linux: `flatpak install flathub open-authenticator`

## Usage

## Contributing

### Vision

Produce a simple, secure, open source multi-factor application. 

# Development Notes

Frameworks:
- Angular 17 - TypeScript MVC framework
- Karma X - Testing framework
- Ionic 7 - Mobile framework & design system/ components
- Capacitor - Device API framework
- Electron Forge X - Desktop framework

3rd party packages:
- [OTPAuth](https://github.com/hectorm/otpauth) - TOTP/HOTP [GitHub](https://github.com/hectorm/otpauth), [Docs](https://hectorm.github.io/otpauth/index.html), [RFC](https://datatracker.ietf.org/doc/html/rfc6238#section-4)
- dropzone? [NPM](https://www.npmjs.com/package/ngx-dropzone)
- qr-scanner - [Git](https://github.com/nimiq/qr-scanner), [Demo](https://nimiq.github.io/qr-scanner/demo/)

## Development Requirements
- [ionic cli](https://ionicframework.com/docs/angular/your-first-app): `npm install -g @ionic/cli native-run cordova-res`

## Build Requirements
- adb (Android Debug Bridge)
    - MacOS/brew `brew install android-platform-tools`


# Notes for desktop
Asked in Ionic Discord channel. Solution provided by Kaoschuks

# install and build project
    'npm i @capacitor-community/electron --force'

    'ionic build --prod --aot --release --optimization'

# run electron app
    `npx cap add @capacitor-community/electron`
    
    `npx cap sync @capacitor-community/electron`
    
    `ionic cap open @capacitor-community/electron `
 
 # build windows app
 npm run electron:win
 
 # build macbook app
 npm run electron:mac


 ## Model diagram
 Important features, labels, OTP Algorithm (HOTP/TOTP);

 These tokens represent Accounts they need to access. Is this the identity?

interface Account

 class Account
    token: HOTP|TOTP instnace
    labels: Array<string>

