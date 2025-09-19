import React from 'react';
import { Eye, Star, MessageCircle, Calendar, Tag, Heart } from 'lucide-react';
import { Poem } from '../types';

interface PoemCardProps {
  poem: Poem;
  onClick: () => void;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, onClick }) => {
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'kavithai': return 'கவிதை';
      case 'paadal': return 'பாடல்';
      case 'kural': return 'குறள்';
      default: return category;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-orange-100 overflow-hidden"
    >
      {poem.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={poem.imageUrl} 
            alt={poem.titleTamil}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getThemeColor(poem.theme)}`}>
              <Heart className="w-4 h-4 mr-1" />
              {poem.theme === 'love' ? 'காதல்' : poem.theme === 'nature' ? 'இயற்கை' : poem.theme === 'social' ? 'சமூகம்' : 'ஆன்மீகம்'}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full">
            {getCategoryLabel(poem.category)}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{poem.averageRating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
          {poem.titleTamil}
        </h3>
        
        <p className="text-gray-600 font-medium mb-3">
          {poem.titleEnglish}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {poem.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {poem.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {poem.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{poem.tags.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{poem.readCount}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{poem.totalReviews}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(poem.publicationDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;