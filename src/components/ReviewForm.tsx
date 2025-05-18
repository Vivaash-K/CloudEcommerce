import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import { Review } from '../types';

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit }) => {
  const { darkMode } = useStore();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onSubmit({
      userId: user.id,
      userName: user.name,
      rating,
      comment,
    });

    // Reset form
    setRating(5);
    setComment('');
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const filled = (hoveredStar ?? rating) >= starValue;

      return (
        <button
          key={index}
          type="button"
          className={`text-2xl ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(null)}
          onClick={() => setRating(starValue)}
        >
          ★
        </button>
      );
    });
  };

  if (!user) {
    return (
      <div className={`p-4 rounded-lg ${
        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
      }`}>
        Please log in to leave a review.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Rating</label>
        <div className="flex gap-1">
          {renderStars()}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg border ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;