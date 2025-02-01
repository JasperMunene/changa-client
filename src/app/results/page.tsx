'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, User, Home, ChevronRight, Users, Filter, ArrowLeft } from "lucide-react";
import { useSearchParams } from 'next/navigation';

// Sample data - replace with actual data from your backend
const allCampaigns = [
  {
    id: 1,
    title: "Save the Rainforest",
    description: "Help us protect 100,000 acres of rainforest and preserve biodiversity for future generations.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80",
    category: "Environment",
    raised: 156420,
    goal: 200000,
    supporters: 1234,
    daysLeft: 15
  },
  {
    id: 2,
    title: "Clean Ocean Initiative",
    description: "Join our mission to remove 50 tons of plastic from our oceans and protect marine life.",
    image: "https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&q=80",
    category: "Environment",
    raised: 89750,
    goal: 100000,
    supporters: 892,
    daysLeft: 23
  },
  {
    id: 3,
    title: "Education for All",
    description: "Help build schools in developing regions and provide quality education to underprivileged children.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80",
    category: "Education",
    raised: 198450,
    goal: 250000,
    supporters: 1567,
    daysLeft: 30
  },
  {
    id: 4,
    title: "Wildlife Protection Fund",
    description: "Support our efforts to protect endangered species and their habitats worldwide.",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&q=80",
    category: "Environment",
    raised: 345670,
    goal: 500000,
    supporters: 2789,
    daysLeft: 45
  },
  {
    id: 5,
    title: "Tech Education Initiative",
    description: "Providing coding education and computers to underprivileged students.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
    category: "Education",
    raised: 78900,
    goal: 150000,
    supporters: 634,
    daysLeft: 60
  }
];

const categories = [
  "All Categories",
  "Environment",
  "Education",
  "Healthcare",
  "Animal Welfare",
  "Humanitarian",
  "Technology",
  "Arts & Culture",
  "Community"
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter campaigns based on search query and selected category
  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesSearch = 
      campaign.title.toLowerCase().includes(query.toLowerCase()) ||
      campaign.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort campaigns based on selected sorting option
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'mostFunded':
        return b.raised - a.raised;
      case 'endingSoon':
        return a.daysLeft - b.daysLeft;
      case 'mostSupporters':
        return b.supporters - a.supporters;
      default: // 'relevance'
        return 0;
    }
  });

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <span className="text-2xl font-bold text-emerald-600">Changa</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                <Home className="w-4 h-4" />
              </a>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-gray-900 font-medium">Search Results</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
              <p className="mt-2 text-gray-600">
                {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'result' : 'results'} for "{query}"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="mostFunded">Most Funded</option>
                    <option value="endingSoon">Ending Soon</option>
                    <option value="mostSupporters">Most Supporters</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Grid */}
        {sortedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCampaigns.map((campaign, index) => {
              const progress = (campaign.raised / campaign.goal) * 100;
              
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-48 rounded-t-xl overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-700">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {campaign.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">
                          {formatMoney(campaign.raised)} raised
                        </span>
                        <span className="text-gray-500">
                          of {formatMoney(campaign.goal)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{campaign.supporters.toLocaleString()} supporters</span>
                      </div>
                      <span>{campaign.daysLeft} days left</span>
                    </div>

                    <a
                      href={`/campaigns/${campaign.id}`}
                      className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      View Campaign
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto"
            >
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any campaigns matching "{query}". Try adjusting your search or filters.
              </p>
              <a
                href="/campaigns"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all campaigns
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}