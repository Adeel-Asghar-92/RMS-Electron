import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import OurRoutes from "./OurRoutes/OurRoutes";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        <OurRoutes />
        <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      </Provider>
    </div>
  );
}

export default App;
