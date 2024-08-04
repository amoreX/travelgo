import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from "./Components/Landing/Landing.js"
import Content from "./Components/Content/Content.js"
const router=createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path:"/Content",
    element: <Content />
  },
  

])
function App() {
  return (
    <>
       <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
