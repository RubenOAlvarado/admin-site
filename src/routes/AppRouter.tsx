import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../components/ui/Layout';
import Clients from '../pages/Clients';
import ClientProviders from '../pages/ClientProviders';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<Layout />}>
        <Route path="/clients" element={<Clients />} />
        <Route path="/question-sets" element={<div>Question Sets</div>} />
        <Route path="/base-questions" element={<div>Base Questions</div>} />
        <Route path="/clients/:id/providers" element={<ClientProviders />} />
        <Route path="/ehr-mappings" element={<div>EHR Mappings</div>} />
        <Route path="/ehr-providers" element={<div>EHR Providers</div>} />
        <Route path="/" element={<Navigate to="/clients" replace />} />
      </Route>

      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;