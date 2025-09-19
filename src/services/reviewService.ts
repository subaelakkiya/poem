import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  updateDoc, 
  doc, 
  increment,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Review } from '../types';

export const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'likes' | 'isLiked'>): Promise<string> => {
  try {
    const reviewData = {
      ...review,
      createdAt: Timestamp.now(),
      likes: 0,
      isLiked: false
    };
    
    const docRef = await addDoc(collection(db, 'reviews'), reviewData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const getReviewsByPoemId = async (poemId: string): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('poemId', '==', poemId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString()
      } as Review);
    });
    
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const likeReview = async (reviewId: string): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error liking review:', error);
    throw error;
  }
};

export const updatePoemStats = async (poemId: string, rating: number): Promise<void> => {
  try {
    // This would typically update poem statistics in a poems collection
    // For now, we'll just log it since we're using mock data for poems
    console.log(`Updating poem ${poemId} with new rating: ${rating}`);
  } catch (error) {
    console.error('Error updating poem stats:', error);
    throw error;
  }
};