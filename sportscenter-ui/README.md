# Sports Center UI

## Create project

```sh
npm create vite@latest

Choose React -> Typescript + SWC

cd project folder

npm install

npm run dev
```

## In vite.config.ts

Change server port:

```sh
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [react()],
})
```

## In package.json

Add a new line to scripts

```sh
"scripts": {
  "start": "vite",
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
},
```

Then you can run the project by typing:

```sh
npm start
```

## Material UI

```sh
npm install @mui/material @emotion/react @emotion/styled
```

## Material UI Lab

```sh
npm install @mui/lab
```

### Roboto Font

```sh
npm install @fontsource/roboto
```

Add the following imports into main.tsx:

```sh
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

### Icons

```sh
npm install @mui/icons-material
```

### React Router

```sh
npm install react-router-dom
npm install react-router-dom@6
```

### Axios

```sh
npm install axios
```

### React Toastify

```sh
npm install react-toastify
```

### React Redux

```sh
npm install redux react-redux
```

### Redux Toolkit

```sh
npm install @reduxjs/toolkit
```

### Cuid2

```sh
npm install @paralleldrive/cuid2
```

### Yup

```sh
npm install yup
```

### Resolvers

```sh
npm install @hookform/resolvers
```
