import { BrowserRouter as Router } from "react-router";
import RouterApp from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <RouterApp />
      </Router>
    </>
  );
}

export default App;
