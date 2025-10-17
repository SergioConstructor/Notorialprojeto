import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import NovaEscritura from "./Pages/NovaEscritura";
import Revisao from "./Pages/Revisao";
import Layout from "./Entities/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/NovaEscritura" element={<NovaEscritura />} />
          <Route path="/Revisao" element={<Revisao />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
