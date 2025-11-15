/**
 * Utility functions to convert between 1-10 rating scale (with decimals) and 1-5 star display scale
 */

/**
 * Converts a rating from 1-10 scale to 1-5 scale for star display
 * @param rating10 - Rating in 1-10 scale (e.g., 8.45)
 * @returns Rating in 1-5 scale (e.g., 4.225)
 */
export const convert10To5 = (rating10: number): number => {
  if (rating10 < 1) return 0;
  if (rating10 > 10) return 5;
  return rating10 / 2;
};

/**
 * Converts a rating from 1-5 scale to 1-10 scale
 * @param rating5 - Rating in 1-5 scale (e.g., 4.5)
 * @returns Rating in 1-10 scale (e.g., 9.0)
 */
export const convert5To10 = (rating5: number): number => {
  if (rating5 < 1) return 0;
  if (rating5 > 5) return 10;
  return rating5 * 2;
};

/**
 * Rounds a rating to the nearest 0.5 for star display
 * This rounds up when the decimal part is >= 0.25 to show half stars more accurately
 * @param rating - Rating value
 * @returns Rounded rating to nearest 0.5
 * 
 * Examples:
 * - 4.225 (8.45/2) -> doubled=8.45, floor=8, decimal=0.45 -> rounds to 4.5 (9/2)
 * - 4.125 (8.25/2) -> doubled=8.25, floor=8, decimal=0.25 -> rounds to 4.5 (9/2)
 * - 4.0 (8.0/2) -> doubled=8.0, floor=8, decimal=0.0 -> rounds to 4.0 (8/2)
 */
export const roundToHalf = (rating: number): number => {
  const doubled = rating * 2;
  const floor = Math.floor(doubled);
  const decimal = doubled - floor;
  
  // If decimal >= 0.25, round up to next half; otherwise round down
  // This ensures values like 4.225 (8.45) round to 4.5 (9) instead of 4.0 (8)
  if (decimal >= 0.25) {
    return (floor + 1) / 2;
  } else {
    return floor / 2;
  }
};

/**
 * Gets the number of full stars for a rating in 1-5 scale
 * @param rating5 - Rating in 1-5 scale
 * @returns Number of full stars (0-5)
 */
export const getFullStars = (rating5: number): number => {
  return Math.floor(rating5);
};

/**
 * Checks if there's a half star for a rating in 1-5 scale
 * @param rating5 - Rating in 1-5 scale
 * @returns True if there's a half star
 */
export const hasHalfStar = (rating5: number): boolean => {
  const rounded = roundToHalf(rating5);
  return rounded % 1 !== 0;
};

/**
 * Gets the number of empty stars for a rating in 1-5 scale
 * @param rating5 - Rating in 1-5 scale
 * @returns Number of empty stars (0-5)
 */
export const getEmptyStars = (rating5: number): number => {
  const full = getFullStars(rating5);
  const hasHalf = hasHalfStar(rating5);
  return 5 - full - (hasHalf ? 1 : 0);
};

