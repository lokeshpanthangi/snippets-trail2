
import React, { useState } from 'react';
import SnippetCard from './SnippetCard';
import { Snippet } from './SnippetCard';
import SnippetDialog from './SnippetDialog';

type SnippetLibraryProps = {
  snippets: Snippet[];
};

const SnippetLibrary = ({ snippets }: SnippetLibraryProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | undefined>(undefined);
  
  const handleSnippetClick = (id: string) => {
    const snippet = snippets.find(s => s.id === id);
    if (snippet) {
      setSelectedSnippet(snippet);
      setDialogOpen(true);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map(snippet => (
          <SnippetCard 
            key={snippet.id} 
            snippet={snippet} 
            onClick={handleSnippetClick} 
          />
        ))}
      </div>
      
      <SnippetDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
    </div>
  );
};

export default SnippetLibrary;
