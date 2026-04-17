import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Ruta del Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas de prueba para verificar que la redirección por roles funciona */}
        <Route path="/admin" element={<div style={{padding: '2rem'}}><h2>Módulo de Administración (Dev 1)</h2><p>Aquí van los catálogos y apertura de secciones.</p></div>} />
        
        <Route path="/recepcion" element={<div style={{padding: '2rem'}}><h2>Módulo Transaccional (Dev 2)</h2><p>Aquí va el proceso de matrícula y aforos.</p></div>} />
        
        {/* Ruta comodín para páginas no encontradas */}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;