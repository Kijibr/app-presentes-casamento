import { ThemeDefault } from "./styles/palette";

type Theme = typeof ThemeDefault;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme { }
}
