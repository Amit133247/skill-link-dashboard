
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnmappedSkillsTab } from '@/components/UnmappedSkillsTab';
import { MappedSkillsTab } from '@/components/MappedSkillsTab';
import { useSkillsData } from '@/hooks/useSkillsData';

const SkillMapping = () => {
  const { skills, internalSkills, loading, updateSkillMapping } = useSkillsData();

  const handleUnmapSkill = (skillId: string) => {
    updateSkillMapping(skillId, null, 'unmapped');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading skill mapping...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Skill Mapping</h1>
        
        <Tabs defaultValue="unmapped" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unmapped">Unmapped Skills</TabsTrigger>
            <TabsTrigger value="mapped">Mapped Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unmapped" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Unmapped Skills</h2>
              <p className="text-gray-600 mb-6">
                These external skills haven't been mapped to internal TIH skills yet. 
                Review the AI suggestions and map them to appropriate internal skills.
              </p>
              <UnmappedSkillsTab 
                skills={skills} 
                internalSkills={internalSkills}
                onMapSkill={updateSkillMapping}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="mapped" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Mapped Skills</h2>
              <p className="text-gray-600 mb-6">
                These skills have been mapped to internal TIH skills. 
                You can review and modify existing mappings here.
              </p>
              <MappedSkillsTab 
                skills={skills}
                onUnmapSkill={handleUnmapSkill}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillMapping;
