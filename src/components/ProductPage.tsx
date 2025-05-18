import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FaStar, FaStarHalf, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import { Product, Review } from '../types';
import ReviewForm from './ReviewForm';

interface ProductPageProps {
  products: Product[];
}

export const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { 
    darkMode, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addToRecentlyViewed,
    getProductReviews,
    addReview
  } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      // Get reviews from localStorage
      const reviewsKey = `product_${product.id}_reviews`;
      const storedReviews = JSON.parse(localStorage.getItem(reviewsKey) || '[]');
      setReviews(storedReviews);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className={`text-center py-16 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="text-xl">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
        >
          <FaArrowLeft />
          Back to Home
        </button>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400" />);
    }

    return stars;
  };

  const handleReviewSubmit = (review: Omit<Review, 'id' | 'createdAt'>) => {
    addReview(product.id, review);
    // Update local state immediately
    const newReview = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold">${product.price}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center border rounded-lg overflow-hidden ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={`px-4 py-2 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className={`px-4 py-2 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
              }}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 
                transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 
                focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/30"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isInWishlist(product.id) ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-600 text-xl" />
              )}
            </button>
          </div>

          <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div>
              <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Category
              </h3>
              <p className="text-lg font-medium">{product.category}</p>
            </div>
            {product.subCategory && (
              <div>
                <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Subcategory
                </h3>
                <p className="text-lg font-medium">{product.subCategory}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={`mt-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {/* Review Form */}
        <div className="mb-8">
          <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`p-6 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{review.username}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {review.comment}
              </p>
            </div>
          ))}

          {reviews.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};