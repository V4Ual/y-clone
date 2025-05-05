import "./App.css";
import { RouterProvider } from "react-router";
import router from "./router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { Store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={Store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
