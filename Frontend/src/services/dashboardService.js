import api from './api';

/**
 * Dashboard Service
 * Handles dashboard data fetching including ML recommendations
 */
const dashboardService = {
  /**
   * Get complete dashboard summary including ML data
   * @returns {Promise} - DashboardSummaryResponse
   */
  getSummary: async () => {
    const response = await api.get('/api/dashboard/summary');
    return response.data;
  },

  /**
   * Get course recommendations (separate endpoint if needed)
   * @returns {Promise} - CourseRecommendationResponse
   */
  getCourseRecommendations: async () => {
    const response = await api.get('/api/recommendations/courses');
    return response.data;
  },

  /**
   * Get project recommendations (separate endpoint if needed)
   * @returns {Promise} - ProjectRecommendationResponse
   */
  getProjectRecommendations: async () => {
    const response = await api.get('/api/recommendations/projects');
    return response.data;
  },

  /**
   * Get skill gap analysis
   * @returns {Promise} - SkillGapAnalysisResponse
   */
  getSkillGapAnalysis: async () => {
    const response = await api.get('/api/analytics/skill-gaps');
    return response.data;
  },

  /**
   * Extract ML recommendations from dashboard data
   * @param {Object} dashboardData - DashboardSummaryResponse
   * @returns {Object} - ML recommendations and predictions
   */
  extractMLData: (dashboardData) => {
    const externalData = dashboardData?.externalApiData || {};
    
    return {
      // Course recommendations from ML API
      recommendedCourses: externalData.recommendations?.recommendedCourses || [],
      
      // Project recommendations from ML API  
      recommendedProjects: externalData.recommendations?.recommendedProjects || [],
      
      // Skill predictions from ML API
      skillGapScore: externalData.skillPrediction?.skillGapScore || 0,
      timeToReadyMonths: externalData.skillPrediction?.timeToReadyMonths || 0,
      recommendedSkills: externalData.skillPrediction?.recommendedSkills || [],
      predictionStatus: externalData.skillPrediction?.status || 'Unknown',
      
      // API call status
      apiStatus: {
        recommendationsSuccess: externalData.status?.recommendationsSuccess || false,
        skillPredictSuccess: externalData.status?.skillPredictSuccess || false,
        youtubeSuccess: externalData.status?.youtubeEnrichmentSuccess || false,
        errorMessage: externalData.status?.errorMessage || null,
      },
      
      // Additional reasoning from ML
      reasoning: externalData.recommendations?.reasoning || '',
      generatedAt: externalData.recommendations?.generatedAt || null,
    };
  },

  /**
   * Get sector theme based on user's industry sector
   * @param {string} sector - "Healthcare", "Agriculture", or "Urban"
   * @returns {Object} - Theme configuration
   */
  getSectorTheme: (sector) => {
    const themes = {
      Healthcare: {
        primary: 'blue-500',
        primaryHex: '#3B82F6',
        secondary: 'blue-100',
        gradient: 'from-blue-400 to-indigo-500',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        icon: 'Heart',
      },
      Agriculture: {
        primary: 'green-500',
        primaryHex: '#10B981',
        secondary: 'green-100',
        gradient: 'from-green-400 to-emerald-500',
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        icon: 'Sprout',
      },
      Urban: {
        primary: 'indigo-500',
        primaryHex: '#6366F1',
        secondary: 'indigo-100',
        gradient: 'from-indigo-400 to-purple-500',
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        icon: 'Building2',
      },
    };
    
    return themes[sector] || themes.Healthcare;
  },
};

export default dashboardService;
