export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

export interface Poem {
  id: string;
  titleTamil: string;
  titleEnglish: string;
  contentTamil: string;
  contentEnglish: string;
  category: 'kavithai' | 'paadal' | 'kural';
  theme: 'love' | 'nature' | 'social' | 'spiritual';
  publicationDate: string;
  imageUrl?: string;
  tags: string[];
  description: string;
  author: string;
  readCount: number;
  averageRating: number;
  totalReviews: number;
}

export interface Review {
  id: string;
  poemId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}