import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Associate Pages
import AssociateLayout from './components/AssociateLayout';
import AssociateHome from './pages/associate/AssociateHome';
import ChangePassword from './pages/associate/settings/ChangePassword';
import Profile from './pages/associate/settings/Profile';
import Staff from './pages/associate/settings/Staff';
import ManualTopUp from './pages/associate/financial/ManualTopUp';
import AddMoney from './pages/associate/financial/AddMoney';
import AutomaticTopUp from './pages/associate/financial/AutomaticTopUp';
import RateList from './pages/associate/financial/RateList';
import AddOrder from './pages/associate/financial/AddOrder';
import NonWovenBags from './pages/associate/financial/NonWovenBags';
import DCutBagOrder from './pages/associate/financial/DCutBagOrder';
import LoopBagOrder from './pages/associate/financial/LoopBagOrder';
import BoxBagOrder from './pages/associate/financial/BoxBagOrder';
import SearchOrder from './pages/associate/order/SearchOrder';
import OrderStage from './pages/associate/order/OrderStage';
import OrderHistory from './pages/associate/order/OrderHistory';
import OrderDetail from './pages/associate/order/OrderDetail';
import Sales from './pages/associate/reports/Sales';
import Notes from './pages/associate/reports/Notes';
import Transactions from './pages/associate/reports/Transactions';
import Invoice from './pages/associate/reports/Invoice';
import RegisterComplaint from './pages/associate/support/RegisterComplaint';
import ComplaintStatus from './pages/associate/support/ComplaintStatus';
import ContactSupport from './pages/associate/support/Contact';
import Terms from './pages/associate/support/Terms';
import Training from './pages/associate/support/Training';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          {/* Associate Member Routes */}
          <Route
            path="/associate"
            element={
              <ProtectedRoute>
                <AssociateLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AddOrder />} />
            
            {/* Settings/Setup */}
            <Route path="settings/change-password" element={<ChangePassword />} />
            <Route path="settings/profile" element={<Profile />} />
            <Route path="settings/staff" element={<Staff />} />
            
            {/* Financial */}
            <Route path="financial/automatic-topup" element={<AutomaticTopUp />} />
            <Route path="financial/manual-topup" element={<ManualTopUp />} />
            <Route path="add-money" element={<AddMoney />} />
            <Route path="rate-list" element={<RateList />} />
            <Route path="add-order" element={<AddOrder />} />
<Route path="financial/non-woven" element={<NonWovenBags />} />
<Route path="add-order/d-cut-bag" element={<DCutBagOrder />} />
<Route path="add-order/loop-bag" element={<LoopBagOrder />} />
<Route path="add-order/box-bag" element={<BoxBagOrder />} />
            
            {/* Order Status */}
            <Route path="order/search-number" element={<SearchOrder />} />
            <Route path="order/search-stage" element={<OrderStage />} />
            <Route path="order/search-date" element={<OrderHistory />} />
            <Route path="order/detail/:id" element={<OrderDetail />} />
            
            {/* Reports */}
            <Route path="reports/sales" element={<Sales />} />
            <Route path="reports/notes" element={<Notes />} />
            <Route path="reports/transactions" element={<Transactions />} />
            <Route path="reports/invoice" element={<Invoice />} />
            
            {/* Support */}
            <Route path="support/register-complaint" element={<RegisterComplaint />} />
            <Route path="support/complaint-status" element={<ComplaintStatus />} />
            <Route path="support/contact" element={<ContactSupport />} />
            <Route path="support/terms" element={<Terms />} />
            <Route path="support/training" element={<Training />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
