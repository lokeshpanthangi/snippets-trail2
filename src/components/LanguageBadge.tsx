
import React from 'react';

type LanguageBadgeProps = {
  language: string;
};

const getLangColor = (lang: string): string => {
  const langLower = lang.toLowerCase();
  
  switch(langLower) {
    case 'javascript':
      return 'bg-lang-js text-gray-900';
    case 'typescript':
      return 'bg-lang-ts text-white';
    case 'python':
      return 'bg-lang-py text-white';
    case 'html':
      return 'bg-lang-html text-white';
    case 'css':
      return 'bg-lang-css text-white';
    case 'ruby':
      return 'bg-lang-ruby text-white';
    case 'go':
      return 'bg-lang-go text-white';
    case 'java':
      return 'bg-lang-java text-white';
    case 'c#':
      return 'bg-lang-csharp text-white';
    case 'php':
      return 'bg-lang-php text-white';
    case 'swift':
      return 'bg-lang-swift text-white';
    case 'rust':
      return 'bg-lang-rust text-white';
    default:
      return 'bg-gray-700 text-white';
  }
};

const getLangIcon = (lang: string): string => {
  const langLower = lang.toLowerCase();
  
  switch(langLower) {
    case 'javascript':
      return 'JS';
    case 'typescript':
      return 'TS';
    case 'python':
      return 'PY';
    case 'html':
      return 'HTML';
    case 'css':
      return 'CSS';
    case 'ruby':
      return 'RB';
    case 'go':
      return 'GO';
    case 'java':
      return 'JAVA';
    case 'c#':
      return 'C#';
    case 'php':
      return 'PHP';
    case 'swift':
      return 'SWIFT';
    case 'rust':
      return 'RUST';
    default:
      return lang.substring(0, 2).toUpperCase();
  }
};

const LanguageBadge = ({ language }: LanguageBadgeProps) => {
  const colorClass = getLangColor(language);
  const languageIcon = getLangIcon(language);
  
  return (
    <span className={`language-badge ${colorClass} transition-all duration-200 hover:scale-105`}>
      {languageIcon}
    </span>
  );
};

export default LanguageBadge;
