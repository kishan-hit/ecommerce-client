import './App.css';
import { RouterProvider } from "react-router-dom";
import router from './routes';

function App() {
  return (
    <div className="bg-slate-900 h-screen">
      <div className="flex items-center justify-center h-screen">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
