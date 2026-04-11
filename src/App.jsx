import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import PostJob from './pages/PostJob'
import MyPostings from './pages/MyPostings'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import CategoryPage from './pages/CategoryPage'
import JobDetails from "./pages/JobDetails";
import SearchPage from "./pages/SearchPage";
import ArticlePage from "./pages/ArticlePage";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-postings" element={<MyPostings />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/engineering" element={<CategoryPage />} />
          <Route path="/polytechnic" element={<CategoryPage />} />
          <Route path="/arts-and-science" element={<CategoryPage />} />
          <Route path="/nursing" element={<CategoryPage />} />
          <Route path="/research-jobs" element={<CategoryPage />} />
          <Route path="/school-jobs" element={<CategoryPage />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { fontSize: '14px', borderRadius: '10px' },
          }}
        />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
