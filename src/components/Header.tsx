
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Code, Search, Plus, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from '@/hooks/use-toast';

type HeaderProps = {
  onCreateSnippet?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

const Header = ({ 
  onCreateSnippet, 
  searchQuery = '',
  onSearchChange 
}: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-snippet-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/dashboard" className="flex items-center gap-2 mr-6">
          <Code className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-jetbrains">SnipStash</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 lg:space-x-6 mr-6">
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/snippets" className="text-sm font-medium transition-colors hover:text-primary">
            Snippets
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Search */}
          {onSearchChange && (
            <div className="hidden md:flex-1 md:flex md:max-w-md relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search snippets..."
                className="pl-8 bg-snippet-code border-snippet-border"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}

          {/* Create Snippet Button */}
          {onCreateSnippet && (
            <Button onClick={onCreateSnippet} variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              <span>Create</span>
            </Button>
          )}

          {/* User Menu */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-sm">
                {user.username || user.email}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
