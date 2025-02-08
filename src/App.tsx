import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './router';

function App() {
  // return <RouterProvider router={router}></RouterProvider>;
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
