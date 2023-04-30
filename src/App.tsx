import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import DownloadPage from "./components/DownloadPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} />
      <Route path=":id" element={<DownloadPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
