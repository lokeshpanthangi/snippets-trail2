
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, LogOut, User, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code } from 'lucide-react';

type HeaderProps = {
  onCreateSnippet: () => void;
  searchQuery?: string;
  onSearchChange?: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ onCreateSnippet, searchQuery = "", onSearchChange }: HeaderProps) => {
  return (
    <header className="bg-sidebar border-b border-sidebar-border sticky top-0 z-10">
      <div className="container flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <Code className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold font-jetbrains">SnipStash</h1>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="bg-sidebar-accent">
              <TabsTrigger value="all">All Snippets</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorite">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search snippets..." 
              className="pl-9 w-64 bg-sidebar-accent border-sidebar-border"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={onCreateSnippet}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" /> New
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/20 text-primary font-medium">
                    DS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-snippet-bg border-snippet-border">
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
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
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
