
import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type CodeBlockProps = {
  code: string;
  language: string;
  preview?: boolean;
  showLineNumbers?: boolean;
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

const CodeBlock = ({ code, language, preview = false, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  
  useEffect(() => {
    // Apply syntax highlighting with a slight delay for animation
    const timer = setTimeout(() => {
      let processedCode = highlightCode(code, language);
      if (showLineNumbers && !preview) {
        processedCode = addLineNumbers(processedCode);
      }
      setHighlightedCode(processedCode);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [code, language, preview, showLineNumbers]);
  
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
    <div className={`code-editor group relative animate-fade-in ${preview ? '' : 'p-0'}`}>
      {!preview && (
        <button 
          onClick={copyToClipboard} 
          className={`copy-button ${copied ? 'bg-secondary/30 text-secondary-foreground' : ''} ${copied ? 'animate-copy-success' : ''}`}
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
      <pre className={`overflow-x-auto ${showLineNumbers && !preview ? 'line-numbered' : ''}`}>
        <code className="font-jetbrains text-sm" dangerouslySetInnerHTML={{ __html: highlightedCode || displayCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
