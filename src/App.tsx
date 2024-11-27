import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import { AdminPage } from './pages/Admin';
import config from '../amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import NewPostPage from './pages/NewPostPage';
import BlogPage from './pages/BlogPage';

Amplify.configure(config);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/newPost" element={<NewPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;