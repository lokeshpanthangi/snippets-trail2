
import React from 'react';
import { ClipboardCopy } from 'lucide-react';
import LanguageBadge from './LanguageBadge';
import TagPill from './TagPill';
import CodeBlock from './CodeBlock';

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
};

const SnippetCard = ({ snippet, onClick }: SnippetCardProps) => {
  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
  };

  return (
    <div 
      className="snippet-card group cursor-pointer"
      onClick={() => onClick(snippet.id)}
    >
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="font-jetbrains font-bold text-lg line-clamp-1">{snippet.title}</h3>
          <LanguageBadge language={snippet.language} />
        </div>
        
        {snippet.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
        )}
        
        <CodeBlock code={snippet.code} language={snippet.language} preview={true} />
        
        <div className="flex flex-wrap gap-1.5">
          {snippet.tags.slice(0, 3).map((tag, idx) => (
            <TagPill key={idx} name={tag.name} type={tag.type} />
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-xs py-1 px-2 bg-muted rounded-full text-muted-foreground">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
          <span>Used {snippet.usageCount} times</span>
          <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
