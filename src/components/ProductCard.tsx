import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { FaHeart, FaRegHeart, FaStar, FaStarHalf, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { darkMode, toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useStore();
  const navigate = useNavigate();

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

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleProductClick}
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
        darkMode ? 'bg-gray-800/70 hover:bg-gray-800/90' : 'bg-white/70 hover:bg-white/90'
      } backdrop-blur-sm shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl`}
    >
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            {isInWishlist(product.id) ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xl" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <FaEye className="text-gray-600 text-xl" />
          </button>
        </div>

        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {product.name}
        </h3>
        <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className={`text-sm line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 
            transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/30"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
