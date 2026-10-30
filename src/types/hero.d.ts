export interface CarouselSlide {
  id: string;
  title: string;
  titleLogoUrl?: string;
  backdropUrl: string;
  backdropPosition?: string;
  mobileBackdropPosition?: string;
  description: string;
  releaseYear?: number;
  maturityRating?: string;
  duration?: string;
  genres?: string[];
  featuredLabel?: string;
  playUrl?: string;
  detailsUrl?: string;
}
