# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/graasp/graasp-app-calculator/compare/v1.0.0...v1.1.0) (2024-01-22)


### Features

* update dependencies and set gitlocalize ([#70](https://github.com/graasp/graasp-app-calculator/issues/70)) ([399e370](https://github.com/graasp/graasp-app-calculator/commit/399e370cf4745459dffa0e0e2c8ae79ca61656ed))

## [1.0.0](https://github.com/graasp/graasp-app-calculator/compare/v0.1.5...v1.0.0) (2023-08-10)


### ⚠ BREAKING CHANGES

* update app for Typeorm ([#34](https://github.com/graasp/graasp-app-calculator/issues/34))

### chore

* set rc release ([e6f86c7](https://github.com/graasp/graasp-app-calculator/commit/e6f86c7310bf66f2d238e26f707254f2b32c0a5c))


### Features

* update app for Typeorm ([#34](https://github.com/graasp/graasp-app-calculator/issues/34)) ([327e3b2](https://github.com/graasp/graasp-app-calculator/commit/327e3b28d0e89673a47eea9a2836280139201f95))


### Bug Fixes

* **deps:** update dependency @graasp/ui to v3.0.0 ([bd8aaf0](https://github.com/graasp/graasp-app-calculator/commit/bd8aaf071a66fc28f9c7cebccd3ec91b6e242cd8))
* **deps:** update dependency @mui/material to v5.13.6 ([56bbb4f](https://github.com/graasp/graasp-app-calculator/commit/56bbb4f040afed8699a10c8f50119ebcf1994055))
* **deps:** update dependency mathjs to v11.8.1 ([#47](https://github.com/graasp/graasp-app-calculator/issues/47)) ([7c23819](https://github.com/graasp/graasp-app-calculator/commit/7c23819152669d83558c5ba2579188f6b2720b35))
* **deps:** update dependency mathjs to v11.8.2 ([a343677](https://github.com/graasp/graasp-app-calculator/commit/a3436774a57e609d123dc557e4170abeeaf53899))
* **deps:** update mui (non-major) ([1aa298d](https://github.com/graasp/graasp-app-calculator/commit/1aa298dbec660d221334200d9e63a145fa325e3c))
* **deps:** update mui (non-major) ([#66](https://github.com/graasp/graasp-app-calculator/issues/66)) ([e99897b](https://github.com/graasp/graasp-app-calculator/commit/e99897b17e338ed502926178005c624fb47bc991))
* update package.json ([64daa03](https://github.com/graasp/graasp-app-calculator/commit/64daa036e3703d4673b803edb7e69d2e764c67f6))
* update workflow sha ref ([1141701](https://github.com/graasp/graasp-app-calculator/commit/114170174445da21e75a6adb3683805a44a43f47))

### [0.1.5](https://github.com/graasp/graasp-app-calculator/compare/v0.1.4...v0.1.5) (2022-07-28)

### Features

- add ci/cd workflows to automate deployment ([bafd3f8](https://github.com/graasp/graasp-app-calculator/commit/bafd3f8c573cbab2535361ee0c244ec4ea8a5250))

### Bug Fixes

- disable unused workflows ([eccbce3](https://github.com/graasp/graasp-app-calculator/commit/eccbce3a90b1ed312cda5dbac35d2e93e11f77df))
- remove unused workflows ([3da4123](https://github.com/graasp/graasp-app-calculator/commit/3da4123fc165b80ec5c760c8c3326541f575cc73))
- secret names ([b3244f8](https://github.com/graasp/graasp-app-calculator/commit/b3244f8523da10ead02262b4429dc36726aabdd3))

### Build System

- add more comments, release with github actions ([0a372ab](https://github.com/graasp/graasp-app-calculator/commit/0a372ab7077d5f8eaa53722f32b9055b80ea4baa))

### [0.1.4](https://github.com/graasp/graasp-app-calculator/compare/v0.1.3...v0.1.4) (2020-11-25)

### Bug Fixes

- add special cases for trigonometric fn ([2568a34](https://github.com/graasp/graasp-app-calculator/commit/2568a34155945e1e33e877dea67c2a13814026f4))

### [0.1.3](https://github.com/graasp/graasp-app-calculator/compare/v0.1.2...v0.1.3) (2020-11-05)

### Features

- do not reset computation on operations ([dda244f](https://github.com/graasp/graasp-app-calculator/commit/dda244fc1e320284557ebfb9389166d3246e2be5))

### Bug Fixes

- correctly CE percent operation ([924c3c5](https://github.com/graasp/graasp-app-calculator/commit/924c3c545cb9135db1044c7bf811ee415940bdd3))

### [0.1.2](https://github.com/graasp/graasp-app-calculator/compare/v0.1.1...v0.1.2) (2020-10-29)

### Features

- add i, e, EE and toggle sign, write tests ([98a4cba](https://github.com/graasp/graasp-app-calculator/commit/98a4cba9b2e363c76b8cc791ee016e48699d72b2)), closes [#14](https://github.com/graasp/graasp-app-calculator/issues/14)

### Bug Fixes

- reset computation on equal ([f3a26c9](https://github.com/graasp/graasp-app-calculator/commit/f3a26c9fd393eb059c9338495378799b2e055ab9))
- tan 90 and related returns infinity ([ac19e2f](https://github.com/graasp/graasp-app-calculator/commit/ac19e2f2d1904627a7cde5dcf7d8d2418d590a38))

### Tests

- test tan values in degree ([a150fc7](https://github.com/graasp/graasp-app-calculator/commit/a150fc72ea9fd1675694f9ab600b5539441e9c58))

### 0.1.1 (2020-10-05)

### Features

- add calculator ([89b6297](https://github.com/graasp/graasp-app-calculator/commit/89b62977648967a78feec77d23f1bd766a523579))
- handle keyboard, add focus indicator ([05d538d](https://github.com/graasp/graasp-app-calculator/commit/05d538d515a9009b6ae8c01d2e5289acd9124882))
- update app name ([70a99e6](https://github.com/graasp/graasp-app-calculator/commit/70a99e6b42f4a312c94cee5072bebb2fc706f439))

### Bug Fixes

- fix appInstance and ready dependencies, refactor replaceAll ([5d806cd](https://github.com/graasp/graasp-app-calculator/commit/5d806cd94915e04762f88a62799f68ea27377bad))
- include times symbol preceding pi after last pi character ([54e8483](https://github.com/graasp/graasp-app-calculator/commit/54e8483720c6fc6022aa9f363af1d6cbd52d4731))

### Documentation

- update name in package.json and readme ([7a31be7](https://github.com/graasp/graasp-app-calculator/commit/7a31be70d59a862d1ac7a31c0d616fd90e0e4c96))

### Continuous Integration

- setup continuous deployment with codeship ([c6f8e6a](https://github.com/graasp/graasp-app-calculator/commit/c6f8e6a1426d9692258b049b7ebc3a7171fb7fec)), closes [#9](https://github.com/graasp/graasp-app-calculator/issues/9)

### Tests

- add keyboard tests ([8f24757](https://github.com/graasp/graasp-app-calculator/commit/8f247575ac62ffedcaece629dd7e5e8ba0e18ce7))
- add scientific tests, handle CE with history, handle angle ([b1bb54f](https://github.com/graasp/graasp-app-calculator/commit/b1bb54f9401ee78abf394f6b509aea9863837adf))
- test calculator ([41cb2a4](https://github.com/graasp/graasp-app-calculator/commit/41cb2a41b32091ce47cd47621997222d91b84e52))

### Build System

- use new aes secret for encrypted files ([e353c4a](https://github.com/graasp/graasp-app-calculator/commit/e353c4a20dd99b7420558749d7cbafdb6cc31693))

## 0.1.0 (2020-09-29)

### Features

- add calculator ([89b6297](https://github.com/graasp/graasp-app-calculator/commit/89b62977648967a78feec77d23f1bd766a523579))
- handle keyboard, add focus indicator ([05d538d](https://github.com/graasp/graasp-app-calculator/commit/05d538d515a9009b6ae8c01d2e5289acd9124882))
- update app name ([70a99e6](https://github.com/graasp/graasp-app-calculator/commit/70a99e6b42f4a312c94cee5072bebb2fc706f439))

### Bug Fixes

- fix appInstance and ready dependencies, refactor replaceAll ([5d806cd](https://github.com/graasp/graasp-app-calculator/commit/5d806cd94915e04762f88a62799f68ea27377bad))
- include times symbol preceding pi after last pi character ([54e8483](https://github.com/graasp/graasp-app-calculator/commit/54e8483720c6fc6022aa9f363af1d6cbd52d4731))

### Documentation

- update name in package.json and readme ([7a31be7](https://github.com/graasp/graasp-app-calculator/commit/7a31be70d59a862d1ac7a31c0d616fd90e0e4c96))

### Continuous Integration

- setup continuous deployment with codeship ([fb991ab](https://github.com/graasp/graasp-app-calculator/commit/fb991ab57ac59e77e70d29ff5f2726cb1c6a1ac0)), closes [#9](https://github.com/graasp/graasp-app-calculator/issues/9)

### Tests

- add keyboard tests ([8f24757](https://github.com/graasp/graasp-app-calculator/commit/8f247575ac62ffedcaece629dd7e5e8ba0e18ce7))
- add scientific tests, handle CE with history, handle angle ([c53b725](https://github.com/graasp/graasp-app-calculator/commit/c53b725b70c0e42d472541a48a4ba6fb6801f377))
- test calculator ([41cb2a4](https://github.com/graasp/graasp-app-calculator/commit/41cb2a41b32091ce47cd47621997222d91b84e52))

# Change Log
