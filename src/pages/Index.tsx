
import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import SnippetLibrary from '../components/SnippetLibrary';
import EmptyState from '../components/EmptyState';
import SnippetDialog from '../components/SnippetDialog';
import { useQuery } from '@tanstack/react-query';
import { getSnippets } from '../services/snippetService';
import { getTags, getLanguageCounts } from '../services/tagService';
import { getFolders } from '../services/folderService';

const Index = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Fetch snippets
  const { data: snippets = [], isLoading: snippetsLoading } = useQuery({
    queryKey: ['snippets'],
    queryFn: getSnippets,
  });

  // Fetch languages
  const { data: languages = [], isLoading: languagesLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguageCounts,
  });

  // Fetch tags
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  // Fetch folders
  const { data: folders = [], isLoading: foldersLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: getFolders,
  });
  
  const handleCreateSnippet = () => {
    setCreateDialogOpen(true);
  };
  
  const isLoading = snippetsLoading || languagesLoading || tagsLoading || foldersLoading;
  
  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <Header onCreateSnippet={handleCreateSnippet} />
      
      <div className="flex">
        <FilterSidebar 
          languages={languages}
          tags={tags}
          folders={folders}
          onCreateSnippet={handleCreateSnippet}
          isLoading={isLoading}
        />
        
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-primary">Loading snippets...</div>
            </div>
          ) : snippets.length > 0 ? (
            <SnippetLibrary snippets={snippets} />
          ) : (
            <EmptyState onCreateSnippet={handleCreateSnippet} />
          )}
        </div>
      </div>
      
      <SnippetDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
};

export default Index;
