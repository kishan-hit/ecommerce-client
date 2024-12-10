import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-slate-900 h-screen">
      <div className="flex items-center justify-center h-screen">
        <BrowserRouter>
          <Routes>
            <Route path='' element={ }></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
