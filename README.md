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
- [Google Authenticator Key](https://github.com/google/google-authenticator/wiki/Key-Uri-Format)

## OTP Google Authenticator Validation Notes

To validate a Google Authenticator URI using a regex pattern, you need to ensure that the URI follows the standard format for otpauth URIs. The format for a TOTP (Time-based One-Time Password) URI is:

```
otpauth://totp/[label]?secret=[secret]&issuer=[issuer]&algorithm=[algorithm]&digits=[digits]&period=[period]
```

Here is a regex pattern that you can use to validate the provided URI:

```typescript
const uri =
  'otpauth://totp/Tloop%3A?issuer=Tloop&secret=I65VU7K5ZQL7WB4E&algorithm=SHA1&digits=6&period=30';

const regex =
  /^otpauth:\/\/totp\/([A-Za-z0-9%]+)(\?issuer=[A-Za-z0-9%]+&secret=[A-Z2-7]+=*&algorithm=(SHA1|SHA256|SHA512)&digits=\d{6}&period=\d{2})?$/;

const isValid = regex.test(uri);
console.log(isValid); // true if the URI is valid, false otherwise
```

### Explanation of the Regex Pattern

[RegExp Editor](https://regex101.com/r/2lViJA/1)

- `^otpauth:\/\/totp\/`: Ensures the URI starts with `otpauth://totp/`.
- `([A-Za-z0-9%]+)`: Matches the label part of the URI which can contain alphanumeric characters and percent-encoded characters.
- `(\?issuer=[A-Za-z0-9%]+&secret=[A-Z2-7]+=*&algorithm=(SHA1|SHA256|SHA512)&digits=\d{6}&period=\d{2})?$`: Matches the query parameters:
  - `\?issuer=[A-Za-z0-9%]+`: Matches the `issuer` parameter with alphanumeric and percent-encoded characters.
  - `&secret=[A-Z2-7]+=*`: Matches the `secret` parameter which contains base32 encoded string (letters A-Z and digits 2-7).
  - `&algorithm=(SHA1|SHA256|SHA512)`: Matches the `algorithm` parameter which can be SHA1, SHA256, or SHA512.
  - `&digits=\d{6}`: Matches the `digits` parameter which should be 6 digits.
  - `&period=\d{2}`: Matches the `period` parameter which should be 2 digits.

This regex pattern ensures that all the components of the TOTP URI are present and valid according to the expected format. You can adjust the pattern if there are any specific variations you need to account for.

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
