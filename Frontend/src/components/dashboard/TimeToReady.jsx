import { motion } from 'framer-motion';
import { Clock, Target, Calendar, TrendingUp } from 'lucide-react';

export default function TimeToReady({ months = 0, targetRole = 'Target Role' }) {
  // Calculate milestones
  const milestones = [
    { month: 1, label: 'Foundation', completed: months <= 11 },
    { month: 3, label: 'Skill Building', completed: months <= 9 },
    { month: 6, label: 'Projects', completed: months <= 6 },
    { month: 9, label: 'Advanced', completed: months <= 3 },
    { month: 12, label: 'Ready', completed: months <= 0 },
  ];

  // Calculate progress percentage
  const maxMonths = 12;
  const progressPercentage = Math.max(0, Math.min(100, ((maxMonths - months) / maxMonths) * 100));

  // Get encouragement message based on time
  const getEncouragementMessage = () => {
    if (months <= 1) return "You're almost there! 🎉";
    if (months <= 3) return "Great progress! Keep it up! 💪";
    if (months <= 6) return "You're halfway there! 🚀";
    if (months <= 9) return "Building strong foundations 📚";
    return "Starting your journey 🌟";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <Clock className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Time to Ready</h3>
          <p className="text-gray-400 text-sm">Estimated career readiness</p>
        </div>
      </div>

      {/* Main Display */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="inline-flex items-end gap-1 mb-2"
        >
          <span className="text-5xl font-bold text-white">{months}</span>
          <span className="text-xl text-gray-400 mb-2">month{months !== 1 ? 's' : ''}</span>
        </motion.div>
        <p className="text-sm text-gray-400">
          to become a <span className="text-blue-400 font-medium">{targetRole}</span>
        </p>
        <p className="text-sm text-green-400 mt-2">{getEncouragementMessage()}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Start</span>
          <span>Goal</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-2">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              milestone.completed 
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-gray-700/30'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              milestone.completed ? 'bg-green-400' : 'bg-gray-600'
            }`} />
            <span className={`flex-1 text-sm ${
              milestone.completed ? 'text-green-300' : 'text-gray-500'
            }`}>
              {milestone.label}
            </span>
            <span className={`text-xs ${
              milestone.completed ? 'text-green-400' : 'text-gray-600'
            }`}>
              Month {milestone.month}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
