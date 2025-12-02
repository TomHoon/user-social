
// src/utils/reviewHelpers.js

// 평균 평점 계산
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

// 별점 표시 (⭐⭐⭐⭐☆)
export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '⭐'.repeat(fullStars) + 
         (hasHalfStar ? '✨' : '') + 
         '☆'.repeat(emptyStars);
};

// 평점별 분포 계산
export const getRatingDistribution = (reviews) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    distribution[review.rating]++;
  });
  return distribution;
};

// 평점 레이블 (Excellent, Very Good, etc.)
export const getRatingLabel = (rating) => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  if (rating >= 3.0) return 'Fair';
  return 'Poor';
};