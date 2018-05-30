import { ratingColors } from './constants';

export default rating => ratingColors.find(({ min, max }) => (
  rating <= max && rating >= min
));
