
import React from 'react';
import { MetricCard } from '@/components/MetricCard';
import { SkillsChart } from '@/components/SkillsChart';
import { MappingProgress } from '@/components/MappingProgress';
import { ImportJobsTable } from '@/components/ImportJobsTable';
import { UnmappedSkillsPreview } from '@/components/UnmappedSkillsPreview';
import { useSkillsData } from '@/hooks/useSkillsData';

const Dashboard = () => {
  const { skills, internalSkills, importJobs, loading } = useSkillsData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Calculate metrics
  const mappedSkills = skills.filter(skill => skill.status === 'mapped').length;
  const unmappedSkills = skills.filter(skill => skill.status === 'unmapped').length;
  const needsReviewSkills = skills.filter(skill => skill.status === 'needs_review').length;
  const aiSuggestions = skills.filter(skill => skill.suggested_matches && skill.suggested_matches.length > 0).length;

  // Chart data
  const chartData = [
    { name: 'Degreed', value: skills.filter(s => s.source === 'Degreed').length, color: '#3B82F6' },
    { name: 'Eightfold', value: skills.filter(s => s.source === 'Eightfold').length, color: '#10B981' },
    { name: 'Blend', value: skills.filter(s => s.source === 'Blend').length, color: '#F59E0B' },
  ];

  const unmappedSkillsData = skills.filter(skill => skill.status === 'unmapped');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Skills Mapping Dashboard</h1>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Mapped Skills" value={mappedSkills} color="blue" />
          <MetricCard title="Unmapped Skills" value={unmappedSkills} color="red" />
          <MetricCard title="AI Mapping Suggestions" value={aiSuggestions} color="green" />
          <MetricCard title="TIH Skills Available" value={internalSkills.length} color="yellow" />
        </div>

        {/* Charts and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SkillsChart data={chartData} />
          <MappingProgress 
            total={skills.length}
            confirmed={mappedSkills}
            needsReview={needsReviewSkills}
          />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImportJobsTable jobs={importJobs} />
          <UnmappedSkillsPreview skills={unmappedSkillsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
