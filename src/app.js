import React from 'react';
import P2P from './samples/p2p';
import Local from './samples/local';
// import OnlineBoilerplate from './samples/online-boilerplate';

import './assets/css/theme.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <P2P />,
  },
  {
    path: "local",
    element: <Local />,
  }
]);

function App() {
	return (
		<React.StrictMode>
	    	<RouterProvider router={router} />
		</React.StrictMode>);
}

export default App;