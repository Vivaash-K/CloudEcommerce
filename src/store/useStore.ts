import { create } from 'zustand';
import { User, Product, CartItem, Review } from '../types';

interface PriceRange {
  min: number;
  max: number;
}

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'popularity' | null;
  setSortBy: (sort: 'price_asc' | 'price_desc' | 'rating' | 'popularity' | null) => void;
  // New features
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  showMiniCart: boolean;
  setShowMiniCart: (show: boolean) => void;
  // Review management
  addReview: (productId: string, review: Omit<Review, 'id' | 'createdAt'>) => void;
  getProductReviews: (productId: string) => Review[];
  products: Product[];
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.productId === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { productId: product.id, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ),
    })),
  wishlist: [],
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
  isInWishlist: (productId) => get().wishlist.includes(productId),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category, selectedSubCategory: null }),
  selectedSubCategory: null,
  setSelectedSubCategory: (subCategory) => set({ selectedSubCategory: subCategory }),
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  showSidebar: true,
  setShowSidebar: (show) => set({ showSidebar: show }),
  sortBy: null,
  setSortBy: (sort) => set({ sortBy: sort }),
  // New feature implementations
  priceRange: { min: 0, max: 1000 },
  setPriceRange: (range) => set({ priceRange: range }),
  minRating: 0,
  setMinRating: (rating) => set({ minRating: rating }),
  recentlyViewed: [],
  addToRecentlyViewed: (product) =>
    set((state) => ({
      recentlyViewed: [
        product,
        ...state.recentlyViewed.filter((p) => p.id !== product.id),
      ].slice(0, 8), // Keep only last 8 items
    })),
  quickViewProduct: null,
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
  showMiniCart: false,
  setShowMiniCart: (show) => set({ showMiniCart: show }),
  // Review management implementation
  addReview: (productId, review) => {
    // Get current reviews from localStorage
    const reviewsKey = `product_${productId}_reviews`;
    const currentReviews = JSON.parse(localStorage.getItem(reviewsKey) || '[]');
    
    const newReview = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Add new review and save to localStorage
    const updatedReviews = [...currentReviews, newReview];
    localStorage.setItem(reviewsKey, JSON.stringify(updatedReviews));
    
    // Update state to trigger re-render
    set((state) => ({
      ...state,
      products: state.products.map(p => 
        p.id === productId 
          ? { ...p, reviews: updatedReviews }
          : p
      )
    }));
  },
  getProductReviews: (productId) => {
    const reviewsKey = `product_${productId}_reviews`;
    return JSON.parse(localStorage.getItem(reviewsKey) || '[]');
  },
  products: [], // Initialize with empty array
}));
