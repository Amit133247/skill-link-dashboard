
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

export const useSkillsData = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [internalSkills, setInternalSkills] = useState<any[]>([]);
  const [importJobs, setImportJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          internal_skills(name)
        `);
      
      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: "Error",
        description: "Failed to fetch skills data",
        variant: "destructive",
      });
    }
  };

  const fetchInternalSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('internal_skills')
        .select('*');
      
      if (error) throw error;
      setInternalSkills(data || []);
    } catch (error) {
      console.error('Error fetching internal skills:', error);
      toast({
        title: "Error",
        description: "Failed to fetch internal skills data",
        variant: "destructive",
      });
    }
  };

  const fetchImportJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('import_jobs')
        .select('*')
        .order('start_time', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setImportJobs(data || []);
    } catch (error) {
      console.error('Error fetching import jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch import jobs data",
        variant: "destructive",
      });
    }
  };

  const updateSkillMapping = async (skillId: string, mappedToId: string | null, status: Database["public"]["Enums"]["skill_status"]) => {
    try {
      const { error } = await supabase
        .from('skills')
        .update({ mapped_to: mappedToId, status })
        .eq('id', skillId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Skill mapping updated successfully",
      });
      
      await fetchSkills();
    } catch (error) {
      console.error('Error updating skill mapping:', error);
      toast({
        title: "Error",
        description: "Failed to update skill mapping",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchSkills(), fetchInternalSkills(), fetchImportJobs()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    skills,
    internalSkills,
    importJobs,
    loading,
    updateSkillMapping,
    refetchData: async () => {
      await Promise.all([fetchSkills(), fetchInternalSkills(), fetchImportJobs()]);
    }
  };
};
