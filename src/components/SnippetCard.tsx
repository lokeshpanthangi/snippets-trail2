
import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';
import LanguageBadge from './LanguageBadge';
import TagPill from './TagPill';
import CodeBlock from './CodeBlock';
import { toast } from '@/hooks/use-toast';

export type Snippet = {
  id: string;
  title: string;
  description?: string;
  language: string;
  code: string;
  tags: {
    name: string;
    type: 'auto' | 'user';
  }[];
  usageCount: number;
  createdAt: string;
};

type SnippetCardProps = {
  snippet: Snippet;
  onClick: (id: string) => void;
  viewMode?: 'grid' | 'list';
  isRecent?: boolean;
  isMostUsed?: boolean;
};

const SnippetCard = ({ 
  snippet, 
  onClick, 
  viewMode = 'grid',
  isRecent = false,
  isMostUsed = false 
}: SnippetCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: `${snippet.title} has been copied to your clipboard.`,
          duration: 2000,
        });
        // Reset the copied state after animation completes
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "There was an error copying to clipboard.",
          variant: "destructive",
        });
        console.error('Failed to copy: ', err);
      });
  };

  const getCardClasses = () => {
    let classes = "snippet-card group cursor-pointer";
    
    if (isRecent) {
      classes += " border-l-secondary";
    } else if (isMostUsed) {
      classes += " border-l-accent";
    } else {
      classes += " border-l-primary";
    }
    
    if (viewMode === 'list') {
      classes += " border-l-4";
    }
    
    return classes;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={getCardClasses()}
        onClick={() => onClick(snippet.id)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex flex-col flex-grow gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-jetbrains font-bold text-lg">{snippet.title}</h3>
              <LanguageBadge language={snippet.language} />
              {isRecent && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full animate-pulse">New</span>
              )}
              {isMostUsed && (
                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">Popular</span>
              )}
            </div>
            
            {snippet.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">{snippet.description}</p>
            )}
            
            <div className="flex flex-nowrap gap-1.5 mt-1 overflow-x-auto scrollbar-none pb-1 max-w-md">
              {snippet.tags.map((tag, idx) => (
                <TagPill key={idx} name={tag.name} type={tag.type} />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-xs text-muted-foreground flex flex-col items-end">
              <span>{snippet.usageCount} uses</span>
              <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
            </div>
            
            <button 
              onClick={handleCopyClick}
              className={`p-2 rounded-md transition-all duration-200 ${copied ? 'bg-secondary/30 text-secondary-foreground' : 'bg-muted/50 hover:bg-primary/20'} ${isHovering ? 'opacity-100' : 'opacity-70'}`}
            >
              {copied ? <Check className="h-5 w-5 animate-copy-success" /> : <ClipboardCopy className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  return (
    <div 
      className={`snippet-card group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${isHovering ? 'shadow-neon-purple' : ''}`}
      onClick={() => onClick(snippet.id)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`p-4 flex flex-col gap-3 border-l-4 ${isRecent ? 'border-l-secondary' : isMostUsed ? 'border-l-accent' : 'border-l-primary'}`}>
        <div className="flex justify-between items-start">
          <h3 className="font-jetbrains font-bold text-lg line-clamp-1">{snippet.title}</h3>
          <div className="flex items-center gap-1">
            {isRecent && (
              <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full animate-pulse">New</span>
            )}
            {isMostUsed && (
              <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">Popular</span>
            )}
            <LanguageBadge language={snippet.language} />
          </div>
        </div>
        
        {snippet.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
        )}
        
        <div className="relative">
          <CodeBlock code={snippet.code} language={snippet.language} preview={true} />
          
          <button 
            onClick={handleCopyClick}
            className={`copy-button ${copied ? 'bg-secondary/30 text-secondary-foreground' : ''} ${copied ? 'animate-copy-success' : ''}`}
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {snippet.tags.map((tag, idx) => (
            <TagPill key={idx} name={tag.name} type={tag.type} />
          ))}
          {snippet.tags.length > 6 && (
            <span className="text-xs py-1 px-2 bg-muted rounded-full text-muted-foreground">
              +{snippet.tags.length - 6}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
          <span className={`${isHovering && snippet.usageCount > 0 ? 'text-primary' : ''} transition-colors duration-200`}>
            Used {snippet.usageCount} times
          </span>
          <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
