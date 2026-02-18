import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { Home } from "./pages/home";
import { GiftsPage } from "./pages/gifts";
import { Location } from "./pages/location";
import Root from "./components/BaseKit";
import { TipsPage } from "./pages/tips";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import Themes from "./styles/palette";
import { CheckoutPage } from "./pages/payment/checkout";
import { PaymentProvider } from "./context/provider/payment";
import { Provider } from "react-redux";
import store from "./store/store";
import isPropValid from '@emotion/is-prop-valid'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Invoice } from "./pages/payment/Components/invoice";
import { SuppliersPage } from "./pages/suppliers";
import Clarity from '@microsoft/clarity';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        path: "home",
        element: <Home />
      },
      {
        path: "gifts",
        element: <GiftsPage />
      },
      {
        path: "gifts/payment/:id",
        element: <CheckoutPage />
      },
      {
        path: "gifts/payment/invoice/:id",
        element: <Invoice />
      },
      {
        path: "Tips",
        element: <TipsPage />
      },
      {
        path: "location",
        element: <Location />
      },
      {
        path: "suppliers",
        element: <SuppliersPage />
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"home"} replace />
  }
]);

Clarity.init("vj27uff4pf");

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <ThemeProvider theme={Themes}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PaymentProvider>
              <StyleSheetManager shouldForwardProp={isPropValid}>
                <GlobalStyle />
                <RouterProvider router={router} />
              </StyleSheetManager>
            </PaymentProvider>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
