
import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type CodeBlockProps = {
  code: string;
  language: string;
  preview?: boolean;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  detectPatterns?: boolean;
};

// Enhanced syntax highlighting function
const highlightCode = (code: string, language: string) => {
  // This is a simplified version - in a real app we'd use a library like Prism or highlight.js
  if (language === 'javascript' || language === 'typescript') {
    return code
      .replace(/(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)(\s|$)/g, '<span style="color: #C678DD;">$1</span>$2')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color: #98C379;">$1</span>')
      .replace(/(\b\d+\b)/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/(\{|\}|\(|\)|\[|\]|=>)/g, '<span style="color: #ABB2BF;">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color: #5C6370;">$1</span>')
      .replace(/(console\.log)/g, '<span style="color: #E06C75;">$1</span>')
      .replace(/(\.map|\.filter|\.reduce|\.forEach)/g, '<span style="color: #61AFEF;">$1</span>')
      .replace(/(fetch|axios|XMLHttpRequest)/g, '<span style="color: #56B6C2;">$1</span>')
      .replace(/(try|catch|throw|finally)/g, '<span style="color: #E5C07B;">$1</span>');
  } else if (language === 'python') {
    return code
      .replace(/(def|class|if|else|elif|for|while|import|from|return|True|False|try|except|finally|with|as)(\s|$)/g, '<span style="color: #C678DD;">$1</span>$2')
      .replace(/(".*?"|'.*?')/g, '<span style="color: #98C379;">$1</span>')
      .replace(/(\b\d+\b)/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/(#.*)/g, '<span style="color: #5C6370;">$1</span>')
      .replace(/(print)/g, '<span style="color: #E06C75;">$1</span>');
  } else if (language === 'css' || language === 'scss') {
    return code
      .replace(/(@\w+)/g, '<span style="color: #C678DD;">$1</span>')
      .replace(/(#[a-fA-F0-9]+)/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/(\d+px|\d+em|\d+rem|\d+%)/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/([\.\#]\w+)/g, '<span style="color: #61AFEF;">$1</span>');
  } else if (language === 'html') {
    return code
      .replace(/(&lt;\/?\w+)/g, '<span style="color: #E06C75;">$1</span>')
      .replace(/(\w+=".*?")/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/(&gt;)/g, '<span style="color: #E06C75;">$1</span>');
  } else {
    return code;
  }
};

// Function to add line numbers to code
const addLineNumbers = (code: string): string => {
  return code.split('\n').map((line, i) => {
    return `<span class="code-line-number">${i + 1}</span>${line}`;
  }).join('\n');
};

// Function to detect and highlight patterns in code
const detectAndHighlightPatterns = (code: string): string => {
  // Detect and wrap patterns in highlighting spans
  let highlightedCode = code;
  
  // Loop detection
  highlightedCode = highlightedCode.replace(/(for\s*\([^)]*\)|while\s*\([^)]*\))/g, 
    '<span class="pattern-highlight pattern-highlight-loop">$1</span>');
  
  // API call detection
  highlightedCode = highlightedCode.replace(/(fetch\s*\(|axios\.|XMLHttpRequest)/g, 
    '<span class="pattern-highlight pattern-highlight-api">$1</span>');
  
  // Error handling detection
  highlightedCode = highlightedCode.replace(/(try\s*{|catch\s*\([^)]*\)|throw\s+new\s+Error)/g, 
    '<span class="pattern-highlight pattern-highlight-error">$1</span>');
  
  // Debugging detection
  highlightedCode = highlightedCode.replace(/(console\.log|console\.error|console\.debug|debugger)/g, 
    '<span class="pattern-highlight pattern-highlight-debug">$1</span>');
  
  // Array methods detection
  highlightedCode = highlightedCode.replace(/(\.\s*map\s*\(|\.\s*filter\s*\(|\.\s*reduce\s*\(|\.\s*forEach\s*\()/g, 
    '<span class="pattern-highlight pattern-highlight-array">$1</span>');
  
  return highlightedCode;
};

const CodeBlock = ({ 
  code, 
  language, 
  preview = false, 
  showLineNumbers = true,
  highlightLines = [],
  detectPatterns = false
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Apply syntax highlighting with a slight delay for animation
    const timer = setTimeout(() => {
      let processedCode = highlightCode(code, language);
      
      if (detectPatterns) {
        processedCode = detectAndHighlightPatterns(processedCode);
      }
      
      if (showLineNumbers && !preview) {
        processedCode = addLineNumbers(processedCode);
      }
      
      // Highlight specific lines if needed
      if (highlightLines.length > 0 && !preview) {
        const lines = processedCode.split('\n');
        processedCode = lines.map((line, i) => {
          return highlightLines.includes(i + 1) 
            ? `<div class="bg-primary/10 -mx-4 px-4">${line}</div>`
            : line;
        }).join('\n');
      }
      
      setHighlightedCode(processedCode);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [code, language, preview, showLineNumbers, highlightLines, detectPatterns]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Code has been copied to your clipboard.",
          duration: 2000,
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "There was an error copying to clipboard.",
          variant: "destructive",
        });
        console.error('Failed to copy: ', err);
      });
  };
  
  const displayCode = preview ? code.split('\n').slice(0, 3).join('\n') : code;
  
  return (
    <div 
      className={`code-editor group relative animate-fade-in ${preview ? '' : 'p-0'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!preview && (
        <button 
          onClick={copyToClipboard} 
          className={`copy-button ${copied ? 'bg-secondary/30 text-secondary-foreground' : ''} 
                     transition-all duration-200 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 animate-copy-success" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
      <pre className={`overflow-x-auto ${showLineNumbers && !preview ? 'line-numbered' : ''}`}>
        <code className="font-jetbrains text-sm transition-opacity duration-300" 
              dangerouslySetInnerHTML={{ __html: highlightedCode || displayCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
