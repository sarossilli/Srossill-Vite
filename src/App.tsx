import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { AdminPage } from './pages/Admin';
import NewPostPage from './pages/NewPostPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import BlogPage from './pages/BlogPage';
import About from './pages/About';
import { Toaster } from 'react-hot-toast';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>

        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
          <Header />
          <main className="flex-grow">
            <Toaster position="top-right" />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AdminPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/:id" element={<PostPage />} />
              <Route path="/project/:id" element={<PostPage />} />
              <Route
                path="/admin/newPost"
                element={
                  <ProtectedRoute>
                    <NewPostPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditPostPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;