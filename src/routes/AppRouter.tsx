import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../components/ui/Layout';
import Clients from '../pages/ClientsPage';
import ProfilePage from '../pages/ProfilePage';
import PublicRoute from '../components/common/PublicRoute';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from '../components/common/PrivateRoute';
import EhrProviderListPage from '../pages/EhrProvidersPage';
import BaseQuestionsListPage from '../pages/BaseQuestionsListPage';
import QuestionSetListPage from '../pages/QuestionsSetPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/question-sets" element={<QuestionSetListPage />} />
          <Route path="/base-questions" element={<BaseQuestionsListPage />} />
          <Route path="/ehr-mappings" element={<div>EHR Mappings</div>} />
          <Route path="/ehr-providers" element={<EhrProviderListPage />} />
          <Route path='/questions' element={<div>Questions</div>} />
        </Route>
      </Route>

      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;