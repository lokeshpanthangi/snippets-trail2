
import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

type CodeBlockProps = {
  code: string;
  language: string;
  preview?: boolean;
};

// Very simple syntax highlighting function
const highlightCode = (code: string, language: string) => {
  // This is a simplified version - in a real app we'd use a library like Prism or highlight.js
  if (language === 'javascript' || language === 'typescript') {
    return code
      .replace(/(const|let|var|function|return|if|else|for|while|class|import|export|from)(\s)/g, '<span style="color: #C678DD;">$1</span>$2')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color: #98C379;">$1</span>')
      .replace(/(\b\d+\b)/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/(\{|\}|\(|\)|\[|\]|=>)/g, '<span style="color: #ABB2BF;">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color: #5C6370;">$1</span>');
  } else if (language === 'python') {
    return code
      .replace(/(def|class|if|else|elif|for|while|import|from|return|True|False)(\s)/g, '<span style="color: #C678DD;">$1</span>$2')
      .replace(/(".*?"|'.*?')/g, '<span style="color: #98C379;">$1</span>')
      .replace(/(\b\d+\b)/g, '<span style="color: #D19A66;">$1</span>')
      .replace(/(#.*)/g, '<span style="color: #5C6370;">$1</span>');
  } else {
    return code;
  }
};

const CodeBlock = ({ code, language, preview = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');
  
  useEffect(() => {
    // Apply syntax highlighting with a slight delay for animation
    const timer = setTimeout(() => {
      setHighlightedCode(highlightCode(code, language));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [code, language]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const displayCode = preview ? code.split('\n').slice(0, 3).join('\n') : code;
  
  return (
    <div className="code-editor group relative animate-fade-in">
      {!preview && (
        <button 
          onClick={copyToClipboard} 
          className={`copy-button ${copied ? 'bg-secondary/30 text-secondary-foreground' : ''} ${copied ? 'animate-copy-success' : ''}`}
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
      <pre className="overflow-x-auto">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode || displayCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
