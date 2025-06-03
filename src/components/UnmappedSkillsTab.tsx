
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UnmappedSkillsTabProps {
  skills: any[];
  internalSkills: any[];
  onMapSkill: (skillId: string, mappedToId: string | null, status: string) => void;
}

export const UnmappedSkillsTab: React.FC<UnmappedSkillsTabProps> = ({ 
  skills, 
  internalSkills, 
  onMapSkill 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'all' || skill.source === sourceFilter;
    return skill.status === 'unmapped' && matchesSearch && matchesSource;
  });

  const handleMapSkill = (skillId: string, internalSkillId: string) => {
    onMapSkill(skillId, internalSkillId, 'mapped');
  };

  const handleIgnoreSkill = (skillId: string) => {
    onMapSkill(skillId, null, 'needs_review');
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Degreed">Degreed</SelectItem>
            <SelectItem value="Eightfold">Eightfold</SelectItem>
            <SelectItem value="Blend">Blend</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Skills Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Suggested Matches</TableHead>
              <TableHead>Users Affected</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSkills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {skill.source}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {skill.suggested_matches?.map((match: string, index: number) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {match}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{skill.user_count}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => handleMapSkill(skill.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Map to..." />
                      </SelectTrigger>
                      <SelectContent>
                        {internalSkills.map((internalSkill) => (
                          <SelectItem key={internalSkill.id} value={internalSkill.id}>
                            {internalSkill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleIgnoreSkill(skill.id)}
                    >
                      Ignore
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
