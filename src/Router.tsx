import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./routes/NotFound";
import ToDoList from "./routes/ToDoList";

const BASE_URL = process.env.PUBLIC_URL;


const defaultRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ToDoList />,
      },
    ],
    errorElement: <NotFound />
  }
], {
  basename: BASE_URL
});

export default defaultRouter;