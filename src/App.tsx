import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { LoginForm } from './components/LoginForm';
import { ProductList } from './components/ProductList';
import { ProductPage } from './components/ProductPage';
import { useStore } from './store/useStore';
import { mockProducts } from './data/products';
import { CategoryFilter } from './components/CategoryFilter';
import { Product } from './types';
import { AppFooter } from './components/AppFooter';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';
import { useAuth } from './context/AuthContext';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

// Create a mutable copy of the readonly array
const products: Product[] = [...mockProducts];

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Component to handle category filtering
const CategoryProducts: React.FC = () => {
  const { selectedCategory, selectedSubCategory } = useStore();
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? product.subCategory === selectedSubCategory : true;
    return matchesCategory && matchesSubCategory;
  });

  return <ProductList products={filteredProducts} />;
};

// Layout component to handle sidebar visibility
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, showSidebar } = useStore();
  const location = useLocation();
  
  // Hide sidebar on profile, login, cart, and wishlist pages
  const hideSidebar = ['/profile', '/login', '/cart', '/wishlist'].includes(location.pathname);

  // Get page title based on current path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'ShopHub';
      case '/login':
        return 'ShopHub - Login';
      case '/wishlist':
        return 'ShopHub - Wishlist';
      case '/cart':
        return 'ShopHub - Cart';
      case '/profile':
        return 'ShopHub - Profile';
      case '/category':
        return 'ShopHub - Categories';
      default:
        if (location.pathname.startsWith('/product/')) {
          return 'ShopHub - Product Details';
        }
        return 'ShopHub';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Helmet>
        <title>{getPageTitle()}</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {showSidebar && !hideSidebar && (
            <aside className="w-64 flex-shrink-0 sticky top-4 h-fit">
              <CategoryFilter />
            </aside>
          )}
          <main className={`flex-grow ${hideSidebar ? 'max-w-4xl mx-auto w-full' : ''}`}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                {children}
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HelmetProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/product/:productId" element={<ProductPage products={products} />} />
              <Route path="/category" element={<CategoryProducts />} />
              <Route path="/payment" element={<div>Redirecting to payment gateway...</div>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </Layout>
        </Router>
      </HelmetProvider>
    </AuthProvider>
  );
};

export default App;