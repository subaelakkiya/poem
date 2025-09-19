@@ .. @@
 import { 
   ArrowLeft, 
   Star, 
   MessageCircle, 
   Eye, 
   Calendar, 
   Tag, 
   Heart,
   ThumbsUp,
   Send,
   ExternalLink
 } from 'lucide-react';
 import { Poem, Review } from '../types';
 import { useAuth } from '../contexts/AuthContext';
-import { mockReviews } from '../data/mockData';
+import { addReview, getReviewsByPoemId, likeReview } from '../services/reviewService';

@@ .. @@
 const PoemDetail: React.FC<PoemDetailProps> = ({ poem, onBack }) => {
   const { user, isAuthenticated } = useAuth();
   const [activeTab, setActiveTab] = useState<'tamil' | 'english'>('tamil');
-  const [reviews, setReviews] = useState<Review[]>(
-    mockReviews.filter(review => review.poemId === poem.id)
-  );
+  const [reviews, setReviews] = useState<Review[]>([]);
   const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
   const [showReviewForm, setShowReviewForm] = useState(false);
+  const [loading, setLoading] = useState(true);
+  const [submitting, setSubmitting] = useState(false);
+
+  useEffect(() => {
+    const fetchReviews = async () => {
+      try {
+        const fetchedReviews = await getReviewsByPoemId(poem.id);
+        setReviews(fetchedReviews);
+      } catch (error) {
+        console.error('Error fetching reviews:', error);
+      } finally {
+        setLoading(false);
+      }
+    };
+
+    fetchReviews();
+  }, [poem.id]);

-  const handleSubmitReview = (e: React.FormEvent) => {
+  const handleSubmitReview = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!isAuthenticated || !user) return;

-    const review: Review = {
-      id: Date.now().toString(),
+    setSubmitting(true);
+    
+    try {
+      const reviewData = {
+        poemId: poem.id,
+        userId: user.id,
+        userName: user.name,
+        userAvatar: user.avatar,
+        rating: newReview.rating,
+        comment: newReview.comment
+      };
+
+      const reviewId = await addReview(reviewData);
+      
+      // Add the new review to the local state
+      const newReviewWithId: Review = {
+        id: reviewId,
+        ...reviewData,
+        createdAt: new Date().toISOString(),
+        likes: 0,
+        isLiked: false
+      };
+
+      setReviews(prev => [newReviewWithId, ...prev]);
+      setNewReview({ rating: 5, comment: '' });
+      setShowReviewForm(false);
+    } catch (error) {
+      console.error('Error submitting review:', error);
+      alert('Failed to submit review. Please try again.');
+    } finally {
+      setSubmitting(false);
+    }
+  };
+
+  const handleLikeReview = async (reviewId: string) => {
+    try {
+      await likeReview(reviewId);
+      // Update local state
+      setReviews(prev => prev.map(review => 
+        review.id === reviewId 
+          ? { ...review, likes: review.likes + 1, isLiked: true }
+          : review
+      ));
+    } catch (error) {
+      console.error('Error liking review:', error);
+    }
+  };
+
+  const handleOldSubmitReview = (e: React.FormEvent) => {
+    e.preventDefault();
+    if (!isAuthenticated || !user) return;
+
+    const review: Review = {
+      id: Date.now().toString(),
       poemId: poem.id,
       userId: user.id,
       userName: user.name,
@@ .. @@
               {/* Reviews List */}
-              <div className="space-y-6">
-                {reviews.map((review) => (
-                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
-                    <div className="flex items-start space-x-4">
-                      <img
-                        src={review.userAvatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
-                        alt={review.userName}
-                        className="w-12 h-12 rounded-full object-cover"
-                      />
-                      <div className="flex-1">
-                        <div className="flex items-center justify-between mb-2">
-                          <div>
-                            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
-                            <div className="flex items-center space-x-2">
-                              <div className="flex text-yellow-500">
-                                {[...Array(5)].map((_, i) => (
-                                  <Star
-                                    key={i}
-                                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
-                                  />
-                                ))}
+              {loading ? (
+                <div className="text-center py-8">
+                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
+                  <p className="text-gray-600 mt-2">Loading reviews...</p>
+                </div>
+              ) : (
+                <div className="space-y-6">
+                  {reviews.map((review) => (
+                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
+                      <div className="flex items-start space-x-4">
+                        <img
+                          src={review.userAvatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
+                          alt={review.userName}
+                          className="w-12 h-12 rounded-full object-cover"
+                        />
+                        <div className="flex-1">
+                          <div className="flex items-center justify-between mb-2">
+                            <div>
+                              <h4 className="font-semibold text-gray-800">{review.userName}</h4>
+                              <div className="flex items-center space-x-2">
+                                <div className="flex text-yellow-500">
+                                  {[...Array(5)].map((_, i) => (
+                                    <Star
+                                      key={i}
+                                      className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
+                                    />
+                                  ))}
+                                </div>
+                                <span className="text-sm text-gray-500">
+                                  {formatDate(review.createdAt)}
+                                </span>
                               </div>
-                              <span className="text-sm text-gray-500">
-                                {formatDate(review.createdAt)}
-                              </span>
                             </div>
                           </div>
+                          <p className="text-gray-700 mb-3">{review.comment}</p>
+                          <div className="flex items-center space-x-4">
+                            <button 
+                              onClick={() => handleLikeReview(review.id)}
+                              disabled={review.isLiked}
+                              className={`flex items-center transition-colors ${
+                                review.isLiked 
+                                  ? 'text-orange-500' 
+                                  : 'text-gray-500 hover:text-orange-500'
+                              }`}
+                            >
+                              <ThumbsUp className="w-4 h-4 mr-1" />
+                              <span>{review.likes}</span>
+                            </button>
+                          </div>
                         </div>
-                        <p className="text-gray-700 mb-3">{review.comment}</p>
-                        <div className="flex items-center space-x-4">
-                          <button className="flex items-center text-gray-500 hover:text-orange-500 transition-colors">
-                            <ThumbsUp className="w-4 h-4 mr-1" />
-                            <span>{review.likes}</span>
-                          </button>
-                        </div>
                       </div>
                     </div>
-                  </div>
-                ))}
-              </div>
+                  ))}
+                  {reviews.length === 0 && (
+                    <div className="text-center py-8">
+                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
+                      <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
+                    </div>
+                  )}
+                </div>
+              )}
             </div>
           </div>

@@ .. @@
                   <div className="flex space-x-3">
                     <button
                       type="submit"
+                      disabled={submitting}
-                      className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
+                      className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                     >
                       <Send className="w-4 h-4 mr-2" />
-                      Submit Review
+                      {submitting ? 'Submitting...' : 'Submit Review'}
                     </button>
                     <button