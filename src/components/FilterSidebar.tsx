
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Trash, Plus, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagPill from './TagPill';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Folder } from '../types/Folder';
import { Tag } from '../types/Tag';

type Language = {
  name: string;
  count: number;
};

type FilterSidebarProps = {
  languages: Language[];
  tags: Tag[];
  folders: Folder[];
  onCreateSnippet: () => void;
  isLoading?: boolean;
};

const FilterSidebar = ({ languages, tags, folders, onCreateSnippet, isLoading }: FilterSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang) 
        : [...prev, lang]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const renderFolder = (folder: Folder, depth = 0) => {
    const isActive = selectedFolder === folder.id;
    
    return (
      <div key={folder.id} className="text-sm">
        <div 
          className={`flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer hover:bg-muted ${isActive ? 'bg-primary/20 text-primary' : ''}`}
          style={{ paddingLeft: `${(depth + 1) * 0.5}rem` }}
          onClick={() => setSelectedFolder(isActive ? null : folder.id)}
        >
          {folder.subfolders && folder.subfolders.length > 0 ? (
            isActive ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
          ) : <span className="w-3.5" />}
          <span>{folder.name}</span>
          <span className="ml-auto text-xs text-muted-foreground">{folder.snippetCount}</span>
        </div>
        
        {folder.subfolders && folder.subfolders.length > 0 && isActive && (
          <div className="ml-2">
            {folder.subfolders.map(subfolder => renderFolder(subfolder, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-sidebar h-[calc(100vh-4rem)] w-64 p-4 flex flex-col border-r border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sidebar h-[calc(100vh-4rem)] w-64 p-4 flex flex-col border-r border-border">
      <div className="mb-6 flex flex-col gap-2">
        <Button onClick={onCreateSnippet} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
          <Plus className="mr-2 h-4 w-4" /> New Snippet
        </Button>
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-sidebar-accent border-sidebar-border"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium py-1">
            <span>Languages</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 space-y-1">
              {languages.map(lang => (
                <div 
                  key={lang.name}
                  onClick={() => toggleLanguage(lang.name)}
                  className={`flex items-center justify-between text-sm py-1 px-2 rounded-md cursor-pointer hover:bg-sidebar-accent ${selectedLanguages.includes(lang.name) ? 'bg-primary/20 text-primary' : ''}`}
                >
                  <span>{lang.name}</span>
                  <span className="text-xs text-muted-foreground">{lang.count}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium py-1">
            <span>Popular Tags</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 flex flex-wrap gap-1.5">
              {tags.slice(0, 15).map(tag => (
                <div 
                  key={tag.name}
                  onClick={() => toggleTag(tag.name)}
                  className={`cursor-pointer ${selectedTags.includes(tag.name) ? 'ring-1 ring-primary' : ''}`}
                >
                  <TagPill name={tag.name} type={tag.type} />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium py-1">
            <span>Folders</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 space-y-1">
              {folders.map(folder => renderFolder(folder))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="mt-4 border-t border-sidebar-border pt-4">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-sm bg-sidebar-accent border-sidebar-border">
          <Filter className="h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
