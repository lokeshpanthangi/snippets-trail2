
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, LogOut, User, Settings, Code, Bell, Moon, Sun, Github } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type HeaderProps = {
  onCreateSnippet: () => void;
  searchQuery?: string;
  onSearchChange?: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ onCreateSnippet, searchQuery = "", onSearchChange }: HeaderProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  return (
    <header className="bg-sidebar border-b border-sidebar-border sticky top-0 z-10">
      <div className="container flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <Code className="h-8 w-8 text-primary mr-2 animate-pulse" />
            <h1 className="text-xl font-bold font-jetbrains">SnipStash</h1>
          </div>
          
          <Tabs defaultValue="all" className="hidden md:block">
            <TabsList className="bg-sidebar-accent">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover:text-primary/70 transition-colors">
                All Snippets
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover:text-primary/70 transition-colors">
                Recent
              </TabsTrigger>
              <TabsTrigger value="favorite" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover:text-primary/70 transition-colors">
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`relative hidden md:block transition-all duration-200 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${searchQuery ? 'text-primary' : 'text-muted-foreground'} transition-colors`} />
            <Input 
              placeholder="Search snippets..." 
              className={`pl-9 bg-sidebar-accent border-sidebar-border focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <Button 
            onClick={onCreateSnippet}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" /> New
          </Button>
          
          <div className="hidden sm:flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/20 text-primary font-medium animate-pulse">
                    DS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-snippet-bg border-snippet-border animate-scale-in">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="rounded-full h-8 w-8 bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">DevSnips</p>
                  <p className="text-xs text-muted-foreground">dev@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 transition-colors">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 transition-colors">
                <Moon className="mr-2 h-4 w-4" />
                <span>Theme</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive transition-colors">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
