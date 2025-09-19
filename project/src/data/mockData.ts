import { Poem, Review } from '../types';

export const mockPoems: Poem[] = [
  {
    id: '1',
    titleTamil: 'காதல் கவிதை',
    titleEnglish: 'Love Poem',
    contentTamil: `காதல் என்பது ஒரு கடல்
அதில் மூழ்கி விடுவோம்
உன் கண்களில் காணும் நட்சத்திரங்கள்
என் இதயத்தில் ஒளிர்கின்றன

மலர்களும் வாசனை பரப்பும்
உன் சிரிப்பின் இனிமையில்
காற்றும் பாடல் பாடும்
நம் காதலின் கீதத்தில்`,
    contentEnglish: `Love is an ocean
In which we drown willingly
The stars I see in your eyes
Shine bright in my heart

Flowers spread their fragrance
In the sweetness of your smile
Even the wind sings songs
Of our love's melody`,
    category: 'kavithai',
    theme: 'love',
    publicationDate: '2024-01-15',
    imageUrl: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['காதல்', 'love', 'romance', 'கவிதை'],
    description: 'A beautiful poem about the depth and beauty of love, comparing it to an ocean and celebrating the beloved.',
    author: 'து.ந.கோ',
    readCount: 1250,
    averageRating: 4.8,
    totalReviews: 45
  },
  {
    id: '2',
    titleTamil: 'இயற்கையின் அழகு',
    titleEnglish: 'Beauty of Nature',
    contentTamil: `மரங்கள் கைகளை விரித்து
வானத்தை தொடுகின்றன
பறவைகள் பாடல் பாடி
காலையை வரவேற்கின்றன

நதிகள் ஓடி வந்து
கடலை அணைக்கின்றன
மலைகள் நிமிர்ந்து நின்று
மேகங்களை முத்தமிடுகின்றன`,
    contentEnglish: `Trees stretch their arms
To touch the sky above
Birds sing their songs
Welcoming the morning

Rivers flow and rush
To embrace the sea
Mountains stand tall
Kissing the clouds`,
    category: 'kavithai',
    theme: 'nature',
    publicationDate: '2024-01-10',
    imageUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['இயற்கை', 'nature', 'environment', 'beauty'],
    description: 'A celebration of nature\'s beauty and the harmony between different elements of the natural world.',
    author: 'து.ந.கோ',
    readCount: 980,
    averageRating: 4.6,
    totalReviews: 32
  },
  {
    id: '3',
    titleTamil: 'சமூக நீதி',
    titleEnglish: 'Social Justice',
    contentTamil: `எல்லோரும் சமம் என்று
சொல்லும் உலகில்
ஏன் இந்த வேறுபாடு?
ஏன் இந்த அநீதி?

பணம் இருப்பவன் மேலே
இல்லாதவன் கீழே
இது எந்த நீதி?
இது எந்த சமத்துவம்?`,
    contentEnglish: `In a world that says
Everyone is equal
Why this discrimination?
Why this injustice?

The rich rise above
The poor stay below
What justice is this?
What equality is this?`,
    category: 'kavithai',
    theme: 'social',
    publicationDate: '2024-01-05',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['சமூகம்', 'social', 'justice', 'equality'],
    description: 'A powerful poem questioning social inequalities and calling for true justice and equality.',
    author: 'து.ந.கோ',
    readCount: 1450,
    averageRating: 4.9,
    totalReviews: 67
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    poemId: '1',
    userId: '2',
    userName: 'அருண் குமார்',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'மிகவும் அழகான கவிதை! காதலின் ஆழத்தை மிக அருமையாக வெளிப்படுத்தியுள்ளீர்கள். வார்த்தைகளின் தேர்வு மிகச் சிறப்பு.',
    createdAt: '2024-01-16T10:30:00Z',
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    poemId: '1',
    userId: '3',
    userName: 'பிரியா ராஜ்',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Beautiful imagery and emotions! The English translation captures the essence perfectly. Thank you for sharing such heartfelt poetry.',
    createdAt: '2024-01-16T14:20:00Z',
    likes: 8,
    isLiked: true
  },
  {
    id: '3',
    poemId: '2',
    userId: '4',
    userName: 'வேல் முருகன்',
    userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4,
    comment: 'இயற்கையின் அழகை மிக நேர்த்தியாக சித்தரித்துள்ளீர்கள். ஒவ்வொரு வரியும் ஒரு ஓவியம் போல் உள்ளது.',
    createdAt: '2024-01-12T09:15:00Z',
    likes: 15,
    isLiked: false
  }
];