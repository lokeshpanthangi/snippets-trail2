
import React, { useState } from 'react';
import { ArrowRight, ArrowUp, Shield, List, Bug } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TagPillProps = {
  name: string;
  type: 'auto' | 'user';
  isNew?: boolean;
  onClick?: () => void;
};

const getTagDescription = (name: string) => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('debug') || nameLower.includes('log')) {
    return "Contains debugging statements like console.log";
  }
  if (nameLower.includes('api') || nameLower.includes('fetch') || nameLower.includes('axios')) {
    return "Contains API or data fetching operations";
  }
  if (nameLower.includes('loop') || nameLower.includes('for') || nameLower.includes('while')) {
    return "Contains loop structures (for, while, forEach)";
  }
  if (nameLower.includes('error') || nameLower.includes('try') || nameLower.includes('catch')) {
    return "Contains error handling with try/catch";
  }
  if (nameLower.includes('array') || nameLower.includes('map') || nameLower.includes('filter')) {
    return "Contains array manipulation methods";
  }
  
  return null;
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
    return <ArrowUp className="w-3 h-3 animate-bounce" />; 
  }
  if (nameLower.includes('error') || nameLower.includes('try') || nameLower.includes('catch')) {
    return <Shield className="w-3 h-3" />;
  }
  if (nameLower.includes('array') || nameLower.includes('map') || nameLower.includes('filter')) {
    return <List className="w-3 h-3" />;
  }
  
  return null;
};

const TagPill = ({ name, type, isNew = false, onClick }: TagPillProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const pillClass = type === 'auto' ? 'tag-pill-auto' : 'tag-pill-user';
  const icon = getTagIcon(name);
  const description = getTagDescription(name);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span 
            className={`tag-pill ${pillClass} transition-all duration-200 hover:-translate-y-0.5
              ${isNew ? 'animate-tag-pulse' : ''}
              ${isHovering ? 'shadow-tag-glow' : ''}
              ${onClick ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onClick}
          >
            {icon && 
              <span className={`transition-transform duration-300 inline-block ${isHovering && name.toLowerCase().includes('loop') ? 'rotate-180' : ''}`}>
                {icon}
              </span>
            }
            {name}
            {type === 'auto' && <span className="ml-1 opacity-50 text-[0.65rem]">•AI</span>}
          </span>
        </TooltipTrigger>
        {description && (
          <TooltipContent side="bottom" className="bg-snippet-bg border-snippet-border text-xs p-2">
            <p>{description}</p>
            {type === 'auto' && <p className="text-muted-foreground mt-1">Auto-detected by SnipStash</p>}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TagPill;
