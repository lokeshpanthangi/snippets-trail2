
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Sparkles, Search, Tag, Star, Github } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-8">
            <Code className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-jetbrains">SnipStash</h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 max-w-3xl">
            Collect code that matters. Find it when you need it.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            A developer-focused code snippet organizer with smart auto-categorization 
            capabilities. Never lose that useful piece of code again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button size="lg" className="gap-2 font-semibold">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="gap-2 font-semibold">
                Explore Demo <Search className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 font-jetbrains">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 hover:bg-snippet-bg transition-colors rounded-lg">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Auto-Tagging</h3>
              <p className="text-muted-foreground">
                Our AI automatically categorizes your code with intelligent tags based on patterns in your snippets.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 hover:bg-snippet-bg transition-colors rounded-lg">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Powerful Search</h3>
              <p className="text-muted-foreground">
                Find any snippet instantly with advanced filtering by language, tags, and full-text search.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 hover:bg-snippet-bg transition-colors rounded-lg">
              <div className="bg-primary/20 p-4 rounded-full mb-6">
                <Tag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Organization</h3>
              <p className="text-muted-foreground">
                Organize snippets with folders, tags, and smart filters to keep your code library tidy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-tr from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-jetbrains">Ready to organize your code snippets?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join SnipStash today and start building your personal code library with smart features.
          </p>
          
          <Link to="/login">
            <Button size="lg" className="gap-2 font-semibold">
              Create Your Account <Star className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-snippet-bg border-t border-snippet-border py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Code className="h-5 w-5 text-primary" />
              <span className="font-jetbrains text-lg">SnipStash</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Features</a>
              <a href="#" className="hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
              <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-snippet-border text-center text-sm text-muted-foreground">
            <p>© 2023 SnipStash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
