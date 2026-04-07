/// <reference types="vite/client" />

declare module '*.css' {
  const src: string
  export default src
}

declare module './styles/index.css';
declare module './styles/theme.css';