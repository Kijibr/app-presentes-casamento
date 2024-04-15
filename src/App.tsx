import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { Home } from "./pages/home";
import { GiftsPage } from "./pages/gifts";
import { Location } from "./pages/location";
import Root from "./components/Alert";
import { TipsPage } from "./pages/tips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/gifts",
        element: <GiftsPage />
      },
      {
        path: "/Tips",
        element: <TipsPage />
      },
      {
        path: "/location",
        element: <Location />
      },
    ],
  }]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <GlobalStyle />
    </div>
  );
}

export default App;
