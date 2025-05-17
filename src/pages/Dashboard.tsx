
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SnippetLibrary from '../components/SnippetLibrary';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';
import SnippetDialog from '../components/SnippetDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Bookmark, Clock, Star, User, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSnippets } from '../services/snippetService';
import { getTags, getLanguageCounts } from '../services/tagService';
import { getFolders } from '../services/folderService';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<any>(undefined);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSnippets, setFilteredSnippets] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const navigate = useNavigate();
  
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile(user);
      } else {
        // Redirect to login if no user found
        navigate('/auth');
      }
    };
    
    fetchUserProfile();
  }, [navigate]);
  
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
    setSelectedSnippet(undefined);
    setCreateDialogOpen(true);
  };
  
  const handleEditSnippet = (snippet: any) => {
    setSelectedSnippet(snippet);
    setCreateDialogOpen(true);
  };
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Filter snippets based on active tab
  useEffect(() => {
    let filtered = [...snippets];
    
    if (activeTab === 'recent') {
      filtered = filtered.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 5);
    } else if (activeTab === 'favorites') {
      filtered = filtered.filter(s => s.usage_count > 15);
    }
    
    // Apply search filter if exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(snippet => 
        snippet.title.toLowerCase().includes(query) || 
        (snippet.description?.toLowerCase().includes(query)) ||
        snippet.code.toLowerCase().includes(query) ||
        snippet.tags.some((tag: any) => tag.name.toLowerCase().includes(query))
      );
    }
    
    setFilteredSnippets(filtered);
  }, [snippets, activeTab, searchQuery]);

  const isLoading = snippetsLoading || languagesLoading || tagsLoading || foldersLoading;

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <Header 
        onCreateSnippet={handleCreateSnippet}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex">
        <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'}`}>
          {!sidebarCollapsed && (
            <FilterSidebar 
              languages={languages}
              tags={tags}
              folders={folders}
              onCreateSnippet={handleCreateSnippet}
              isLoading={isLoading}
            />
          )}
        </div>
        
        <div className="flex-1 relative">
          {/* Sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 z-10 bg-primary/10 hover:bg-primary/20"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          
          <div className="p-6">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold font-jetbrains">My Snippets</h1>
                <p className="text-muted-foreground">Organize and access your code snippets</p>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 md:grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="all" className="flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    <span className="hidden md:inline">All</span>
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="hidden md:inline">Recent</span>
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="hidden md:inline">Favorites</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Profile</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {activeTab === 'profile' ? (
              <div className="bg-snippet-bg border border-snippet-border rounded-lg p-6 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-bold font-jetbrains">
                      {userProfile?.email || 'User'}
                    </h2>
                    <p className="text-muted-foreground">{userProfile?.email}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-snippet-code p-3 rounded-md">
                        <div className="text-2xl font-bold">{snippets.length}</div>
                        <div className="text-sm text-muted-foreground">Total Snippets</div>
                      </div>
                      <div className="bg-snippet-code p-3 rounded-md">
                        <div className="text-2xl font-bold">{languages.length}</div>
                        <div className="text-sm text-muted-foreground">Languages</div>
                      </div>
                      <div className="bg-snippet-code p-3 rounded-md">
                        <div className="text-2xl font-bold">{tags.length}</div>
                        <div className="text-sm text-muted-foreground">Tags</div>
                      </div>
                      <div className="bg-snippet-code p-3 rounded-md">
                        <div className="text-2xl font-bold">{folders.length}</div>
                        <div className="text-sm text-muted-foreground">Folders</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Settings</h3>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Account Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-pulse text-primary">Loading snippets...</div>
              </div>
            ) : filteredSnippets.length > 0 ? (
              <SnippetLibrary 
                snippets={filteredSnippets}
              />
            ) : (
              <EmptyState onCreateSnippet={handleCreateSnippet} />
            )}
            
            {/* Floating action button */}
            <Button
              className="fixed right-6 bottom-6 shadow-lg rounded-full h-14 w-14 p-0"
              onClick={handleCreateSnippet}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      <SnippetDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        snippet={selectedSnippet}
      />
    </div>
  );
};

export default Dashboard;
