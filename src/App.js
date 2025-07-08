import React, { useState, useEffect } from 'react';
import './App.css'; // if you're using styles
// You can include Tailwind setup or other CSS imports here if needed

// Then paste your entire SkillSwapPlatform component below this line:
const SkillSwapPlatform = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [sortBy, setSortBy] = useState('karma');

  // Sample skill categories
  const categories = [
    'Programming', 'Design', 'Languages', 'Music', 'Cooking', 'Sports', 
    'Arts & Crafts', 'Business', 'Photography', 'Writing', 'Mathematics', 'Science'
  ];

  // Sample users data
  const sampleUsers = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1-555-0123',
      location: 'New York, NY',
      karma: 485,
      rating: 4.8,
      totalExchanges: 23,
      skillsOffered: ['React Development', 'JavaScript', 'Node.js'],
      skillsWanted: ['French', 'Photography', 'Guitar'],
      availability: 'weekends',
      bio: 'Full-stack developer passionate about teaching and learning new skills.',
      joinDate: '2024-01-15',
      isOnline: true
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria@example.com',
      phone: '+1-555-0456',
      location: 'Los Angeles, CA',
      karma: 672,
      rating: 4.9,
      totalExchanges: 31,
      skillsOffered: ['Spanish', 'Digital Marketing', 'Content Writing'],
      skillsWanted: ['Python', 'Data Analysis', 'Piano'],
      availability: 'evenings',
      bio: 'Marketing professional and native Spanish speaker. Love helping others learn!',
      joinDate: '2023-11-22',
      isOnline: false
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david@example.com',
      phone: '+1-555-0789',
      location: 'San Francisco, CA',
      karma: 521,
      rating: 4.7,
      totalExchanges: 18,
      skillsOffered: ['Photography', 'Photoshop', 'Video Editing'],
      skillsWanted: ['Web Design', 'Mandarin', 'Cooking'],
      availability: 'flexible',
      bio: 'Professional photographer looking to expand my digital skills.',
      joinDate: '2024-02-08',
      isOnline: true
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1-555-0321',
      location: 'Chicago, IL',
      karma: 398,
      rating: 4.6,
      totalExchanges: 15,
      skillsOffered: ['Piano', 'Music Theory', 'Singing'],
      skillsWanted: ['Graphic Design', 'Italian', 'Yoga'],
      availability: 'weekdays',
      bio: 'Music teacher with 10+ years experience. Always eager to learn new things!',
      joinDate: '2024-03-12',
      isOnline: true
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1-555-0654',
      location: 'Austin, TX',
      karma: 743,
      rating: 4.9,
      totalExchanges: 42,
      skillsOffered: ['Guitar', 'Cooking', 'Fitness Training'],
      skillsWanted: ['Portuguese', 'Digital Art', 'Meditation'],
      availability: 'weekends',
      bio: 'Musician and fitness enthusiast. Believer in the power of skill sharing!',
      joinDate: '2023-09-30',
      isOnline: false
    },
    {
      id: 6,
      name: 'Lisa Park',
      email: 'lisa@example.com',
      phone: '+1-555-0987',
      location: 'Seattle, WA',
      karma: 456,
      rating: 4.8,
      totalExchanges: 21,
      skillsOffered: ['Korean', 'Calligraphy', 'Meditation'],
      skillsWanted: ['Baking', 'Photography', 'German'],
      availability: 'evenings',
      bio: 'Language teacher and mindfulness practitioner. Love cultural exchange!',
      joinDate: '2024-01-28',
      isOnline: true
    }
  ];

  useEffect(() => {
    setUsers(sampleUsers);
    setFilteredUsers(sampleUsers);
  }, []);

  useEffect(() => {
    let filtered = users.filter(user => {
      if (currentUser && user.id === currentUser.id) return false;
      
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
                             user.skillsOffered.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));
      
      const matchesLocation = locationFilter === '' || 
                             user.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesAvailability = availabilityFilter === 'all' || 
                                 user.availability === availabilityFilter;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesAvailability;
    });

    // Sort filtered users
    filtered.sort((a, b) => {
      if (sortBy === 'karma') return b.karma - a.karma;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'exchanges') return b.totalExchanges - a.totalExchanges;
      if (sortBy === 'recent') return new Date(b.joinDate) - new Date(a.joinDate);
      return 0;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedCategory, locationFilter, availabilityFilter, sortBy, currentUser]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setShowLogin(false);
  };

  const handleCreateProfile = (profileData) => {
    const newUser = {
      ...profileData,
      id: users.length + 1,
      karma: 0,
      rating: 5.0,
      totalExchanges: 0,
      joinDate: new Date().toISOString().split('T')[0],
      isOnline: true
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setShowCreateProfile(false);
    setShowLogin(false);
  };

  const getKarmaColor = (karma) => {
    if (karma >= 700) return 'text-purple-600';
    if (karma >= 500) return 'text-blue-600';
    if (karma >= 300) return 'text-green-600';
    if (karma >= 100) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getKarmaLevel = (karma) => {
    if (karma >= 700) return 'Master';
    if (karma >= 500) return 'Expert';
    if (karma >= 300) return 'Advanced';
    if (karma >= 100) return 'Intermediate';
    return 'Beginner';
  };

  if (showLogin) {
    return <LoginPage onLogin={handleLogin} onCreateProfile={() => setShowCreateProfile(true)} />;
  }

  if (showCreateProfile) {
    return <CreateProfilePage onCreateProfile={handleCreateProfile} onBack={() => setShowCreateProfile(false)} categories={categories} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-indigo-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Skill Swap</h1>
                <p className="text-sm text-gray-600">Decentralized Skill Sharing Platform</p>
              </div>
            </div>
            {currentUser && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{currentUser.name}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className={`font-semibold ${getKarmaColor(currentUser.karma)}`}>
                      {currentUser.karma} Karma
                    </span>
                    <span className="text-gray-500">({getKarmaLevel(currentUser.karma)})</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search skills or people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="karma">Karma Points</option>
                <option value="rating">Rating</option>
                <option value="exchanges">Total Exchanges</option>
                <option value="recent">Recently Joined</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredUsers.length} skill swappers found
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No skill swappers found</h3>
            <p className="text-gray-500">Try adjusting your search filters to find more people.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const getKarmaColor = (karma) => {
    if (karma >= 700) return 'text-purple-600';
    if (karma >= 500) return 'text-blue-600';
    if (karma >= 300) return 'text-green-600';
    if (karma >= 100) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getKarmaLevel = (karma) => {
    if (karma >= 700) return 'Master';
    if (karma >= 500) return 'Expert';
    if (karma >= 300) return 'Advanced';
    if (karma >= 100) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className={`font-semibold ${getKarmaColor(user.karma)}`}>
                  {user.karma} Karma
                </span>
                <span className="text-gray-500">({getKarmaLevel(user.karma)})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {user.isOnline && (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
            <div className="flex items-center space-x-1">
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-sm font-semibold">{user.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{user.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Available: {user.availability}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <span>{user.totalExchanges} exchanges completed</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Skills Offered:</h4>
            <div className="flex flex-wrap gap-1">
              {user.skillsOffered.map(skill => (
                <span key={skill} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Skills Wanted:</h4>
            <div className="flex flex-wrap gap-1">
              {user.skillsWanted.map(skill => (
                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">{user.bio}</p>

        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${user.email}`}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Email</span>
          </a>
          <a
            href={`tel:${user.phone}`}
            className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin, onCreateProfile }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple demo login
    const demoUser = {
      id: 999,
      name: 'Demo User',
      email: email,
      phone: '+1-555-DEMO',
      location: 'Your City',
      karma: 150,
      rating: 4.5,
      totalExchanges: 5,
      skillsOffered: ['Demo Skill'],
      skillsWanted: ['Learning'],
      availability: 'flexible',
      bio: 'Demo user account for testing the platform.',
      joinDate: '2024-07-06',
      isOnline: true
    };
    onLogin(demoUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl w-16 h-16 mx-auto mb-4">
            <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Swap</h1>
          <p className="text-gray-600">Join the decentralized skill sharing community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onCreateProfile}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create Profile
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo:</strong> Use any email and password to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

const CreateProfilePage = ({ onCreateProfile, onBack, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: 'flexible',
    bio: ''
  });

  const [currentSkillOffered, setCurrentSkillOffered] = useState('');
  const [currentSkillWanted, setCurrentSkillWanted] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProfile(formData);
  };

  const addSkillOffered = () => {
    if (currentSkillOffered.trim() && !formData.skillsOffered.includes(currentSkillOffered.trim())) {
      setFormData({
        ...formData,
        skillsOffered: [...formData.skillsOffered, currentSkillOffered.trim()]
      });
      setCurrentSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (currentSkillWanted.trim() && !formData.skillsWanted.includes(currentSkillWanted.trim())) {
      setFormData({
        ...formData,
        skillsWanted: [...formData.skillsWanted, currentSkillWanted.trim()]
      });
      setCurrentSkillWanted('');
    }
  };

  const removeSkillOffered = (skill) => {
    setFormData({
      ...formData,
      skillsOffered: formData.skillsOffered.filter(s => s !== skill)
    });
  };

  const removeSkillWanted = (skill) => {
    setFormData({
      ...formData,
      skillsWanted: formData.skillsWanted.filter(s => s !== skill)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
            <p className="text-gray-600 mt-2">Join the skill sharing community</p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="City, State/Country"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="flexible">Flexible</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills You Can Offer *
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={currentSkillOffered}
                onChange={(e) => setCurrentSkillOffered(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., JavaScript, Guitar, Spanish"
              />
              <button
                type="button"
                onClick={addSkillOffered}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skillsOffered.map(skill => (
                <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center space-x-1">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillOffered(skill)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills You Want to Learn *
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={currentSkillWanted}
                onChange={(e) => setCurrentSkillWanted(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Photography, Cooking, French"
              />
              <button
                type="button"
                onClick={addSkillWanted}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skillsWanted.map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center space-x-1">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillWanted(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell others about yourself and your passion for learning and teaching..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              disabled={!formData.name || !formData.email || !formData.phone || !formData.location || formData.skillsOffered.length === 0 || formData.skillsWanted.length === 0}
            >
              Create Profile
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillSwapPlatform;
