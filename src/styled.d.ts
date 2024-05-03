
import 'styled-components';
import ThemeDefault from "./styles/palette";

type Theme = typeof ThemeDefault;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}
