import React, { useState } from 'react';
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
import { mockReviews } from '../data/mockData';

interface PoemDetailProps {
  poem: Poem;
  onBack: () => void;
}

const PoemDetail: React.FC<PoemDetailProps> = ({ poem, onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'tamil' | 'english'>('tamil');
  const [reviews, setReviews] = useState<Review[]>(
    mockReviews.filter(review => review.poemId === poem.id)
  );
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) return;

    const review: Review = {
      id: Date.now().toString(),
      poemId: poem.id,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ta-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'love': return 'text-red-500 bg-red-50';
      case 'nature': return 'text-green-500 bg-green-50';
      case 'social': return 'text-blue-500 bg-blue-50';
      case 'spiritual': return 'text-purple-500 bg-purple-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{poem.titleTamil}</h1>
              <p className="text-xl text-gray-600 mb-4">{poem.titleEnglish}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-500 mb-2">
                <Star className="w-6 h-6 fill-current" />
                <span className="ml-2 text-2xl font-bold text-gray-800">{poem.averageRating}</span>
                <span className="ml-1 text-gray-600">({poem.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                <span>{poem.readCount} reads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Poem Image */}
            {poem.imageUrl && (
              <div className="mb-8">
                <img 
                  src={poem.imageUrl} 
                  alt={poem.titleTamil}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Language Toggle */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">கவிதை உள்ளடக்கம்</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('tamil')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      activeTab === 'tamil'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-orange-500'
                    }`}
                  >
                    தமிழ்
                  </button>
                  <button
                    onClick={() => setActiveTab('english')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      activeTab === 'english'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-orange-500'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div className="prose max-w-none">
                {activeTab === 'tamil' ? (
                  <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line font-medium">
                    {poem.contentTamil}
                  </div>
                ) : (
                  <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                    {poem.contentEnglish}
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-orange-500" />
                  Reviews ({reviews.length})
                </h3>
                {isAuthenticated && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Write Review
                  </button>
                )}
              </div>

              {/* Review Form */}
              {showReviewForm && isAuthenticated && (
                <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                          className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          <Star className="w-full h-full fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Share your thoughts about this poem..."
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.userAvatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-gray-500 hover:text-orange-500 transition-colors">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span>{review.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poem Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Poem Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Author</span>
                  <p className="font-medium text-gray-800">{poem.author}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Published</span>
                  <p className="font-medium text-gray-800">{formatDate(poem.publicationDate)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Theme</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getThemeColor(poem.theme)}`}>
                    <Heart className="w-4 h-4 mr-1" />
                    {poem.theme === 'love' ? 'காதல்' : poem.theme === 'nature' ? 'இயற்கை' : poem.theme === 'social' ? 'சமூகம்' : 'ஆன்மீகம்'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {poem.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share Feedback</h3>
              <p className="text-gray-600 text-sm mb-4">
                Have detailed feedback or suggestions? Share them through our feedback form.
              </p>
              <a
                href="https://forms.google.com/feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Feedback Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemDetail;