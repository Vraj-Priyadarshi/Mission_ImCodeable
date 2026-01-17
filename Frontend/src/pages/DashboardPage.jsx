import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  FolderGit2, 
  Target,
  LogOut,
  Settings,
  User,
  ChevronDown,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import dashboardService from '../services/dashboardService';

// Dashboard Components
import SkillGapCard from '../components/dashboard/SkillGapCard';
import RecommendedCourses from '../components/dashboard/RecommendedCourses';
import RecommendedProjects from '../components/dashboard/RecommendedProjects';
import CareerPathway from '../components/dashboard/CareerPathway';
import SkillsOverview from '../components/dashboard/SkillsOverview';
import ProfileSummary from '../components/dashboard/ProfileSummary';
import TimeToReady from '../components/dashboard/TimeToReady';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout, currentSector, sectorTheme } = useAuth();

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await dashboardService.getDashboard();
      setDashboardData(data);
      
      // Extract ML data
      const extractedMlData = dashboardService.extractMLData(data);
      setMlData(extractedMlData);
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your personalized dashboard...</p>
            <p className="text-gray-500 text-sm mt-2">Fetching AI recommendations</p>
          </div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <div>
                <span className="text-xl font-bold text-white">SkillPath</span>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  currentSector === 'Healthcare' ? 'bg-blue-500/20 text-blue-300' :
                  currentSector === 'Agriculture' ? 'bg-green-500/20 text-green-300' :
                  'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {currentSector}
                </span>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white hidden sm:block">{user?.firstName}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-lg py-2"
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-gray-400 text-sm truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400">{error}</p>
                </div>
                <button
                  onClick={fetchDashboardData}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </motion.div>
            )}

            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-gray-400">
                Here's your personalized career intelligence dashboard
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-2xl font-bold text-white">
                  {mlData?.skillGapScore || 0}%
                </p>
                <p className="text-gray-400 text-sm">Skill Match</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <Target className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-2xl font-bold text-white">
                  {mlData?.timeToReadyMonths || 0}
                </p>
                <p className="text-gray-400 text-sm">Months to Ready</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <BookOpen className="w-8 h-8 text-yellow-400 mb-2" />
                <p className="text-2xl font-bold text-white">
                  {mlData?.recommendedCourses?.length || 0}
                </p>
                <p className="text-gray-400 text-sm">Recommended Courses</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <FolderGit2 className="w-8 h-8 text-purple-400 mb-2" />
                <p className="text-2xl font-bold text-white">
                  {mlData?.recommendedProjects?.length || 0}
                </p>
                <p className="text-gray-400 text-sm">Project Ideas</p>
              </motion.div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skill Gap Analysis */}
                <SkillGapCard 
                  skillGapScore={mlData?.skillGapScore} 
                  recommendedSkills={mlData?.recommendedSkills}
                  sectorTheme={sectorTheme}
                />

                {/* Career Pathway */}
                <CareerPathway 
                  dashboardData={dashboardData}
                  mlData={mlData}
                />

                {/* Recommended Courses with YouTube */}
                <RecommendedCourses 
                  courses={mlData?.recommendedCourses || []}
                  youtubeVideos={mlData?.youtubeVideos || []}
                />

                {/* Recommended Projects */}
                <RecommendedProjects 
                  projects={mlData?.recommendedProjects || []}
                />
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Profile Summary */}
                <ProfileSummary dashboardData={dashboardData} />

                {/* Time to Ready */}
                <TimeToReady 
                  months={mlData?.timeToReadyMonths}
                  targetRole={dashboardData?.careerProfile?.targetJobRole}
                />

                {/* Skills Overview */}
                <SkillsOverview dashboardData={dashboardData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
}
