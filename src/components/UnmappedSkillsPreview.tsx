
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UnmappedSkill {
  id: string;
  name: string;
  source: string;
  user_count: number;
}

interface UnmappedSkillsPreviewProps {
  skills: UnmappedSkill[];
}

export const UnmappedSkillsPreview: React.FC<UnmappedSkillsPreviewProps> = ({ skills }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 text-red-700">Unmapped Skills (Top 5)</h3>
      <div className="max-h-64 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.slice(0, 5).map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>{skill.source}</TableCell>
                <TableCell>{skill.user_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
