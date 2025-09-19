import React, { useState } from 'react';
import { 
  BookOpen, 
  Save, 
  Eye, 
  Calendar, 
  Tag, 
  FileText, 
  Image as ImageIcon,
  Globe,
  Heart,
  Leaf,
  Users,
  Sparkles
} from 'lucide-react';

interface PoemData {
  titleTamil: string;
  titleEnglish: string;
  contentTamil: string;
  contentEnglish: string;
  category: string;
  theme: string;
  publicationDate: string;
  status: 'draft' | 'published';
  tags: string[];
  description: string;
  imageUrl?: string;
}

const AddPoemForm: React.FC = () => {
  const [poemData, setPoemData] = useState<PoemData>({
    titleTamil: '',
    titleEnglish: '',
    contentTamil: '',
    contentEnglish: '',
    category: 'kavithai',
    theme: 'love',
    publicationDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    tags: [],
    description: '',
    imageUrl: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [activeTab, setActiveTab] = useState<'tamil' | 'english'>('tamil');

  const categories = [
    { value: 'kavithai', label: 'கவிதை (Poetry)', icon: BookOpen },
    { value: 'paadal', label: 'பாடல் (Song)', icon: Sparkles },
    { value: 'kural', label: 'குறள் (Couplet)', icon: FileText }
  ];

  const themes = [
    { value: 'love', label: 'காதல் (Love)', icon: Heart, color: 'text-red-500' },
    { value: 'nature', label: 'இயற்கை (Nature)', icon: Leaf, color: 'text-green-500' },
    { value: 'social', label: 'சமூகம் (Social)', icon: Users, color: 'text-blue-500' },
    { value: 'spiritual', label: 'ஆன்மீகம் (Spiritual)', icon: Sparkles, color: 'text-purple-500' }
  ];

  const handleInputChange = (field: keyof PoemData, value: string) => {
    setPoemData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !poemData.tags.includes(currentTag.trim())) {
      setPoemData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPoemData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (status: 'draft' | 'published') => {
    const finalData = { ...poemData, status };
    console.log('Poem data:', finalData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-2">
            புதிய கவிதை சேர்க்க
          </h1>
          <p className="text-xl text-gray-600">Add New Poem</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Toggle */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Globe className="text-orange-500" />
                  மொழி தேர்வு (Language Selection)
                </h2>
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

              {/* Tamil Content */}
              {activeTab === 'tamil' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      கவிதையின் தலைப்பு (Poem Title)
                    </label>
                    <input
                      type="text"
                      value={poemData.titleTamil}
                      onChange={(e) => handleInputChange('titleTamil', e.target.value)}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      placeholder="உங்கள் கவிதையின் தலைப்பை இங்கே எழுதுங்கள்..."
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      கவிதை உள்ளடக்கம் (Poem Content)
                    </label>
                    <textarea
                      value={poemData.contentTamil}
                      onChange={(e) => handleInputChange('contentTamil', e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg leading-relaxed"
                      placeholder="உங்கள் கவிதையை இங்கே எழுதுங்கள்..."
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    />
                  </div>
                </div>
              )}

              {/* English Content */}
              {activeTab === 'english' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      English Title
                    </label>
                    <input
                      type="text"
                      value={poemData.titleEnglish}
                      onChange={(e) => handleInputChange('titleEnglish', e.target.value)}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      placeholder="Enter the English title of your poem..."
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      English Translation/Content
                    </label>
                    <textarea
                      value={poemData.contentEnglish}
                      onChange={(e) => handleInputChange('contentEnglish', e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg leading-relaxed"
                      placeholder="Enter your poem or translation in English..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="text-orange-500" />
                விளக்கம் (Description)
              </h3>
              <textarea
                value={poemData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="கவிதை பற்றிய சிறு விளக்கம்... (Brief description about the poem...)"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="text-orange-500" />
                வகை (Category)
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={poemData.category === cat.value}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <cat.icon className="w-5 h-5 text-gray-500 group-hover:text-orange-500" />
                    <span className="text-gray-700 group-hover:text-orange-600">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Tag className="text-orange-500" />
                கருப்பொருள் (Theme)
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {themes.map((theme) => (
                  <label key={theme.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="theme"
                      value={theme.value}
                      checked={poemData.theme === theme.value}
                      onChange={(e) => handleInputChange('theme', e.target.value)}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <theme.icon className={`w-5 h-5 ${theme.color}`} />
                    <span className="text-gray-700 group-hover:text-orange-600">{theme.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                குறிச்சொற்கள் (Tags)
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Tag சேர்க்க..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {poemData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Publication Date */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-orange-500" />
                வெளியிடல் தேதி (Publication Date)
              </h3>
              <input
                type="date"
                value={poemData.publicationDate}
                onChange={(e) => handleInputChange('publicationDate', e.target.value)}
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ImageIcon className="text-orange-500" />
                படம் (Image)
              </h3>
              <input
                type="url"
                value={poemData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="படத்தின் URL (Image URL)"
              />
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleSubmit('published')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye className="w-5 h-5" />
                  வெளியிடு (Publish)
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('draft')}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Save className="w-5 h-5" />
                  கரு சேமி (Save Draft)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPoemForm;