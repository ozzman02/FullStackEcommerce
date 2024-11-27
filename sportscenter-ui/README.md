# Sports Center UI

## Create project

```sh
npm create vite@latest
```

Choose React -> Typescript + SWC

```sh
cd project folder
```

```sh
npm install
```

```sh
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
