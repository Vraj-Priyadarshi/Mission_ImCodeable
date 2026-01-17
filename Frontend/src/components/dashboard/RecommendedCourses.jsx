import { motion } from 'framer-motion';
import { BookOpen, Play, ExternalLink, Youtube, Star } from 'lucide-react';

export default function RecommendedCourses({ courses = [], youtubeVideos = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Recommended Learning</h3>
          <p className="text-gray-400 text-sm">AI-curated courses and videos</p>
        </div>
      </div>

      {/* Courses Section */}
      {courses && courses.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Courses</h4>
          <div className="space-y-3">
            {courses.slice(0, 5).map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-white">{course.name || course}</h5>
                    {course.platform && (
                      <p className="text-sm text-gray-400 mt-1">{course.platform}</p>
                    )}
                    {course.duration && (
                      <p className="text-xs text-gray-500 mt-1">{course.duration}</p>
                    )}
                  </div>
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 p-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* YouTube Videos Section */}
      {youtubeVideos && youtubeVideos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Youtube className="w-4 h-4 text-red-500" />
            <h4 className="text-sm font-medium text-gray-400">Video Tutorials</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {youtubeVideos.slice(0, 4).map((video, index) => (
              <motion.a
                key={video.videoId || index}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors group"
              >
                <div className="relative">
                  {video.thumbnail && (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-24 object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                <div className="p-3">
                  <h5 className="text-sm font-medium text-white line-clamp-2">
                    {video.title}
                  </h5>
                  {video.channelTitle && (
                    <p className="text-xs text-gray-500 mt-1">{video.channelTitle}</p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!courses || courses.length === 0) && (!youtubeVideos || youtubeVideos.length === 0) && (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No course recommendations available yet</p>
          <p className="text-gray-600 text-sm mt-1">Complete your profile for personalized suggestions</p>
        </div>
      )}
    </motion.div>
  );
}
