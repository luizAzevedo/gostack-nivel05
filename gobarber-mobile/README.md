 ## 🚀 Iniciando aplicativo mobile

Neste módulo criaremos a versão mobile do GoBarber que será utilizada pelos usuários para agendar serviços dentro da plataforma.

### 💭 Sobre:

Estrutura e padrões
6 aulas

Autenticação e cadastro
7 aulas

Conectando com a API
3 aulas

---

### 💪 Ferramentas utilizadas:

- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

### 🥁 Como rodar:

 `yarn start`

 `yarn android`


### 📝 Comandos utilizados na instalação:

npx react-native init appgobarber --template react-native-template-typescript

yarn add eslint -D

yarn eslint --init

? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Does your project use TypeScript? Yes
? Where does your code run?
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JSON
Checking peerDependencies of eslint-config-airbnb@latest
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.19.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1 eslint-plugin-jsx-a11y@^6.2.3 eslint-plugin-react-hooks@^2.5.0 || ^1.7.0 @typescript-eslint/parser@latest
? Would you like to install them now with npm? No

yarn add -D eslint-plugin-react@^7.19.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint-plugin-import@^2.20.1 eslint-plugin-jsx-a11y@^6.2.3 eslint-plugin-react-hooks@^2.5.0 @typescript-eslint/parser@latest

yarn add -D prettier eslint-config-prettier eslint-plugin-prettier

yarn add -D eslint-import-resolver-typescript

yarn add styled-components

yarn add -D @types/styled-components

#### https://reactnavigation.org/docs siga as intruções

yarn add @react-navigation/native

yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add @react-navigation/stack


yarn react-native link

#### Instalando icons

yarn add react-native-vector-icons

Acrescentar no final do arquivo >android/app/build.gradle

  project.ext.vectoricons = [
    iconFontNames: ['Feather.ttf']
  ]

  apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


yarn add -D @types/react-native-vector-icons


corrigir problemas do Iphone

yarn add react-native-iphone-x-helper

yarn add @unform/core @unform/mobile


yarn add yup

yarn add -D @types/yup


yarn add axios


criar a porta de acesso do emulador android

adb reverse tcp:3333 tcp:3333


yarn add @react-native-community/async-storage
