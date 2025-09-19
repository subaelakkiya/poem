import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  User, 
  LogOut,
  Heart,
  Leaf,
  Users,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockPoems } from '../data/mockData';
import { Poem } from '../types';
import PoemCard from './PoemCard';
import PoemDetail from './PoemDetail';

const Portfolio: React.FC = () => {
  const { user, logout } = useAuth();
  const [poems] = useState<Poem[]>(mockPoems);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const themes = [
    { value: 'all', label: 'All Themes', icon: BookOpen, color: 'text-gray-500' },
    { value: 'love', label: 'காதல் (Love)', icon: Heart, color: 'text-red-500' },
    { value: 'nature', label: 'இயற்கை (Nature)', icon: Leaf, color: 'text-green-500' },
    { value: 'social', label: 'சமூகம் (Social)', icon: Users, color: 'text-blue-500' },
    { value: 'spiritual', label: 'ஆன்மீகம் (Spiritual)', icon: Sparkles, color: 'text-purple-500' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'kavithai', label: 'கவிதை (Poetry)' },
    { value: 'paadal', label: 'பாடல் (Song)' },
    { value: 'kural', label: 'குறள் (Couplet)' }
  ];

  const filteredPoems = poems.filter(poem => {
    const matchesSearch = poem.titleTamil.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme === 'all' || poem.theme === selectedTheme;
    const matchesCategory = selectedCategory === 'all' || poem.category === selectedCategory;
    
    return matchesSearch && matchesTheme && matchesCategory;
  });

  if (selectedPoem) {
    return <PoemDetail poem={selectedPoem} onBack={() => setSelectedPoem(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">து.ந.கோ கவிதைகள்</h1>
                <p className="text-gray-600">T.N.G Poetry Collection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="font-medium text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">Poetry Reader</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Poems
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Search by title or description..."
                />
              </div>
            </div>

            {/* Theme Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  {themes.map((theme) => (
                    <option key={theme.value} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPoems.length} of {poems.length} poems
          </p>
        </div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoems.map((poem) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              onClick={() => setSelectedPoem(poem)}
            />
          ))}
        </div>

        {filteredPoems.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No poems found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;