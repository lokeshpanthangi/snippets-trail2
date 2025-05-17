
import React from 'react';

type LanguageProps = {
  language: string;
};

const languageColors: Record<string, string> = {
  javascript: 'bg-lang-js text-black',
  python: 'bg-lang-py text-white',
  typescript: 'bg-lang-ts text-white',
  html: 'bg-lang-html text-white',
  css: 'bg-lang-css text-white',
  ruby: 'bg-lang-ruby text-white',
  go: 'bg-lang-go text-white',
  java: 'bg-lang-java text-white',
  csharp: 'bg-lang-csharp text-white',
  php: 'bg-lang-php text-white',
  swift: 'bg-lang-swift text-white',
  rust: 'bg-lang-rust text-white',
  default: 'bg-muted text-muted-foreground',
};

const languageDisplay: Record<string, string> = {
  javascript: 'JS',
  typescript: 'TS',
  python: 'PY',
  html: 'HTML',
  css: 'CSS',
  ruby: 'RUBY',
  go: 'GO',
  java: 'JAVA',
  csharp: 'C#',
  php: 'PHP',
  swift: 'SWIFT',
  rust: 'RUST',
};

const LanguageBadge = ({ language }: LanguageProps) => {
  const normalizedLang = language.toLowerCase();
  const colorClass = languageColors[normalizedLang] || languageColors.default;
  const displayText = languageDisplay[normalizedLang] || language.toUpperCase();

  return (
    <span className={`language-badge ${colorClass}`}>
      {displayText}
    </span>
  );
};

export default LanguageBadge;
