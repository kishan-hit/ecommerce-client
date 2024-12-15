import './App.css';
import { RouterProvider } from "react-router-dom";
import router from './routes';
import { SessionProvider } from './context/SessionContext';

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </div>
  );
}

export default App;
