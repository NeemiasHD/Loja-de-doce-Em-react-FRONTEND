import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'



import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom'

//paginas
import EditarProduto from './routes/EditarProduto.jsx'
import Home from './routes/Home.jsx'



const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
            {
        path: "/edit",
        element: <EditarProduto />,
      },
    ],
  },
]);
import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
