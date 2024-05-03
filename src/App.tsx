import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { Home } from "./pages/home";
import { GiftsPage } from "./pages/gifts";
import { Location } from "./pages/location";
import Root from "./components/BaseKit";
import { TipsPage } from "./pages/tips";
import { ThemeProvider } from "styled-components";
import Themes from "./styles/palette";
import { CheckoutPage } from "./pages/payment/checkout";
import { PaymentProvider } from "./context/provider/payment";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "gifts",
        element: <GiftsPage />
      },
      {
        path: "gifts/payment",
        element: <CheckoutPage />
      },
      {
        path: "Tips",
        element: <TipsPage />
      },
      {
        path: "location",
        element: <Location />
      },
    ],
  }]);
function App() {
  return (
    <div>
      <ThemeProvider theme={Themes}>
        <PaymentProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </PaymentProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
