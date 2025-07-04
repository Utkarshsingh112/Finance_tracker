import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Calendar, 
  Newspaper, 
  TrendingUp,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Mock financial news data for demonstration
  const mockArticles = [
    {
      id: 1,
      title: "Federal Reserve Announces New Interest Rate Policy",
      description: "The Federal Reserve has announced a significant change in monetary policy that could impact consumer spending and investment strategies.",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "Financial Times" },
      urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Stock Market Reaches Record Highs Amid Economic Recovery",
      description: "Major stock indices continue their upward trajectory as investors show confidence in the ongoing economic recovery.",
      url: "#",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      source: { name: "Bloomberg" },
      urlToImage: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Cryptocurrency Market Shows Signs of Stabilization",
      description: "After months of volatility, digital currencies are showing more stable trading patterns as institutional adoption increases.",
      url: "#",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      source: { name: "CoinDesk" },
      urlToImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Personal Finance Tips for Young Professionals",
      description: "Expert advice on budgeting, saving, and investing for millennials and Gen Z entering the workforce.",
      url: "#",
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      source: { name: "Wall Street Journal" },
      urlToImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Housing Market Trends: What to Expect in 2024",
      description: "Real estate experts share insights on mortgage rates, home prices, and the best strategies for homebuyers.",
      url: "#",
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      source: { name: "Reuters" },
      urlToImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "ESG Investing: The Future of Sustainable Finance",
      description: "Environmental, Social, and Governance factors are becoming increasingly important in investment decisions.",
      url: "#",
      publishedAt: new Date(Date.now() - 432000000).toISOString(),
      source: { name: "CNBC" },
      urlToImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    }
  ];

  const fetchFinancialNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demonstration, we'll use mock data
      // In a real app, you would fetch from a news API like:
      // const response = await fetch(`https://newsapi.org/v2/everything?q=finance&sortBy=publishedAt&apiKey=${API_KEY}`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticles(mockArticles);
    } catch (err) {
      setError('Failed to fetch financial news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFinancialNews();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchFinancialNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const ArticleCard = ({ article }) => (
    <motion.div
      variants={itemVariants}
      className="card p-6 h-full flex flex-col"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {article.urlToImage && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="font-medium">{article.source.name}</span>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
          </div>
        </div>
        
        <motion.a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center justify-center space-x-2 mt-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Read More</span>
          <ExternalLink size={16} />
        </motion.a>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading financial news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Unable to Load News
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <motion.button
            onClick={handleRefresh}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
              <Newspaper size={32} className="text-primary-600" />
              <span>Financial News</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with the latest financial market trends and insights
            </p>
          </div>
          <motion.button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={refreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw size={16} />
            </motion.div>
            <span>Refresh</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Featured Article */}
      {articles.length > 0 && (
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <TrendingUp size={24} className="text-primary-600" />
            <span>Featured Story</span>
          </h2>
          <div className="card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {articles[0].urlToImage && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={articles[0].urlToImage}
                    alt={articles[0].title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {articles[0].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {articles[0].description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span className="font-medium">{articles[0].source.name}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{format(new Date(articles[0].publishedAt), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                <motion.a
                  href={articles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Read Full Article</span>
                  <ExternalLink size={16} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* News Grid */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Latest Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </motion.div>

      {articles.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="card p-12 text-center"
        >
          <Newspaper size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No articles available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for the latest financial news and insights.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Blog;
