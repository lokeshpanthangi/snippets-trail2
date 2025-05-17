
import React from 'react';
import { ArrowRight, ArrowUp, Shield, List, Bug } from 'lucide-react';

type TagPillProps = {
  name: string;
  type: 'auto' | 'user';
};

const getTagIcon = (name: string) => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('debug') || nameLower.includes('log')) {
    return <Bug className="w-3 h-3" />;
  }
  if (nameLower.includes('api') || nameLower.includes('fetch') || nameLower.includes('axios')) {
    return <ArrowRight className="w-3 h-3" />;
  }
  if (nameLower.includes('loop') || nameLower.includes('for') || nameLower.includes('while')) {
    return <ArrowUp className="w-3 h-3" />; 
  }
  if (nameLower.includes('error') || nameLower.includes('try') || nameLower.includes('catch')) {
    return <Shield className="w-3 h-3" />;
  }
  if (nameLower.includes('array') || nameLower.includes('map') || nameLower.includes('filter')) {
    return <List className="w-3 h-3" />;
  }
  
  return null;
};

const TagPill = ({ name, type }: TagPillProps) => {
  const pillClass = type === 'auto' ? 'tag-pill-auto' : 'tag-pill-user';
  const icon = getTagIcon(name);
  
  return (
    <span className={`tag-pill ${pillClass} transition-all duration-200 hover:-translate-y-0.5`}>
      {icon}
      {name}
      {type === 'auto' && <span className="ml-1 opacity-50 text-[0.65rem]">•AI</span>}
    </span>
  );
};

export default TagPill;
