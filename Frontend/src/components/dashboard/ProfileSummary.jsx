import { motion } from 'framer-motion';
import { User, GraduationCap, Target, Briefcase, BookOpen, FolderGit2, Award } from 'lucide-react';

const educationLabels = {
  1: 'High School',
  2: "Bachelor's",
  3: "Master's",
  4: 'PhD',
};

export default function ProfileSummary({ dashboardData }) {
  const academicProfile = dashboardData?.academicProfile || {};
  const careerProfile = dashboardData?.careerProfile || {};
  const courses = dashboardData?.courses || [];
  const projects = dashboardData?.projects || [];
  const certifications = dashboardData?.certifications || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <User className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Profile Summary</h3>
          <p className="text-gray-400 text-sm">Your academic & career details</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Education */}
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-400">Education</p>
            <p className="text-white">
              {educationLabels[academicProfile.educationLevel] || 'Not specified'}
            </p>
            {academicProfile.fieldOfStudy && (
              <p className="text-sm text-gray-500">{academicProfile.fieldOfStudy}</p>
            )}
            {academicProfile.cgpaPercentage > 0 && (
              <p className="text-xs text-gray-600">
                CGPA/Score: {academicProfile.cgpaPercentage}
              </p>
            )}
          </div>
        </div>

        {/* Target Role */}
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-400">Target Role</p>
            <p className="text-white">{careerProfile.targetJobRole || 'Not specified'}</p>
          </div>
        </div>

        {/* Industry */}
        <div className="flex items-start gap-3">
          <Briefcase className="w-5 h-5 text-purple-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-400">Industry Sector</p>
            <p className="text-white">{careerProfile.industrySector || 'Not specified'}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-gray-700/50">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-900/50 rounded-lg">
              <BookOpen className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{courses.length}</p>
              <p className="text-xs text-gray-500">Courses</p>
            </div>
            <div className="text-center p-2 bg-gray-900/50 rounded-lg">
              <FolderGit2 className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{projects.length}</p>
              <p className="text-xs text-gray-500">Projects</p>
            </div>
            <div className="text-center p-2 bg-gray-900/50 rounded-lg">
              <Award className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{certifications.length}</p>
              <p className="text-xs text-gray-500">Certs</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
