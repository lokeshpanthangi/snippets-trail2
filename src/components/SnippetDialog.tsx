
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CodeBlock from './CodeBlock';
import TagPill from './TagPill';
import { X, Plus, Sparkles } from 'lucide-react';
import { Snippet } from './SnippetCard';

type SnippetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippet?: Snippet;
};

const programmingLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 
  'PHP', 'Ruby', 'Go', 'Swift', 'Rust', 'HTML', 'CSS'
];

// Simulate tag suggestions based on code content
const generateAutoTags = (code: string, language: string): { name: string, type: 'auto' }[] => {
  const tags: { name: string, type: 'auto' }[] = [];
  const lowerCode = code.toLowerCase();
  
  // Simple rule-based tag detection
  if (lowerCode.includes('fetch(') || lowerCode.includes('axios.')) {
    tags.push({ name: 'api', type: 'auto' });
  }
  
  if (lowerCode.includes('for (') || lowerCode.includes('while (') || lowerCode.includes('forEach')) {
    tags.push({ name: 'loop', type: 'auto' });
  }
  
  if (lowerCode.includes('try {') || lowerCode.includes('catch (')) {
    tags.push({ name: 'error-handling', type: 'auto' });
  }
  
  if (lowerCode.includes('console.log') || lowerCode.includes('print(')) {
    tags.push({ name: 'debugging', type: 'auto' });
  }
  
  if (lowerCode.includes('.map(') || lowerCode.includes('.filter(') || lowerCode.includes('.reduce(')) {
    tags.push({ name: 'array-methods', type: 'auto' });
  }
  
  if (lowerCode.includes('function') || lowerCode.includes('def ')) {
    tags.push({ name: 'function', type: 'auto' });
  }

  // Add language tag
  if (language) {
    tags.push({ name: language.toLowerCase(), type: 'auto' });
  }
  
  return tags;
};

const SnippetDialog = ({ open, onOpenChange, snippet }: SnippetDialogProps) => {
  const [title, setTitle] = useState(snippet?.title || '');
  const [description, setDescription] = useState(snippet?.description || '');
  const [language, setLanguage] = useState(snippet?.language || 'JavaScript');
  const [code, setCode] = useState(snippet?.code || '');
  const [userTags, setUserTags] = useState<string[]>(
    snippet?.tags.filter(t => t.type === 'user').map(t => t.name) || []
  );
  const [newTag, setNewTag] = useState('');
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  
  // Auto-generated tags based on code content
  const autoTags = generateAutoTags(code, language);
  
  const handleAddTag = () => {
    if (newTag && !userTags.includes(newTag)) {
      setUserTags([...userTags, newTag]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setUserTags(userTags.filter(t => t !== tag));
  };
  
  const handleGenerateAutoTags = () => {
    // Simulate AI generating tags
    setIsGeneratingTags(true);
    setTimeout(() => {
      setIsGeneratingTags(false);
    }, 1500);
  };
  
  const handleSave = () => {
    // Process form data and save the snippet
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-snippet-bg text-foreground">
        <DialogHeader>
          <DialogTitle className="font-jetbrains text-xl">
            {snippet ? 'Edit Snippet' : 'Create New Snippet'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <Label htmlFor="title" className="font-jetbrains">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-snippet-code border-snippet-border"
              />
            </div>
            
            <div>
              <Label htmlFor="language" className="font-jetbrains">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-snippet-code border-snippet-border">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-snippet-bg border-snippet-border">
                  {programmingLanguages.map(lang => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="font-jetbrains">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-snippet-code border-snippet-border resize-none h-20"
            />
          </div>
          
          <div>
            <Label htmlFor="code" className="font-jetbrains">Code</Label>
            <div className="mt-1 relative">
              <Textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-snippet-code border-snippet-border resize-none h-64 font-jetbrains"
              />
              
              <div className="mt-4 border border-snippet-border rounded-md overflow-hidden">
                <div className="p-2 bg-snippet-code/50 border-b border-snippet-border text-sm font-jetbrains">
                  Preview
                </div>
                <CodeBlock code={code} language={language.toLowerCase()} />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="font-jetbrains">Tags</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleGenerateAutoTags} 
                disabled={isGeneratingTags || !code}
                className="text-xs h-7 gap-1"
              >
                <Sparkles className="h-3 w-3" />
                {isGeneratingTags ? 'Generating...' : 'Auto-detect Tags'}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {autoTags.map((tag, idx) => (
                <TagPill key={`auto-${idx}`} name={tag.name} type="auto" />
              ))}
              
              {userTags.map((tag, idx) => (
                <div key={`user-${idx}`} className="flex items-center">
                  <TagPill name={tag} type="user" />
                  <button 
                    onClick={() => handleRemoveTag(tag)} 
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a custom tag..."
                className="bg-snippet-code border-snippet-border"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button 
                variant="outline" 
                onClick={handleAddTag}
                disabled={!newTag}
                className="gap-1"
              >
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Snippet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SnippetDialog;
