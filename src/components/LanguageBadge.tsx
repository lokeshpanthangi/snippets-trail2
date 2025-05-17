
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
  c: 'bg-gray-700 text-white',
  cpp: 'bg-blue-800 text-white',
  dart: 'bg-blue-500 text-white',
  kotlin: 'bg-purple-600 text-white',
  scala: 'bg-red-700 text-white',
  haskell: 'bg-gray-600 text-white',
  shell: 'bg-gray-800 text-green-300',
  bash: 'bg-gray-800 text-green-300',
  powershell: 'bg-blue-900 text-blue-200',
  sql: 'bg-orange-700 text-white',
  markdown: 'bg-gray-700 text-white',
  json: 'bg-gray-600 text-yellow-300',
  xml: 'bg-gray-700 text-orange-300',
  yaml: 'bg-purple-800 text-white',
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
  c: 'C',
  cpp: 'C++',
  dart: 'DART',
  kotlin: 'KT',
  scala: 'SCALA',
  haskell: 'HS',
  shell: 'SH',
  bash: 'BASH',
  powershell: 'PS',
  sql: 'SQL',
  markdown: 'MD',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
};

const LanguageBadge = ({ language }: LanguageProps) => {
  const normalizedLang = language.toLowerCase();
  const colorClass = languageColors[normalizedLang] || languageColors.default;
  const displayText = languageDisplay[normalizedLang] || language.toUpperCase();

  return (
    <span className={`language-badge ${colorClass} flex items-center gap-1`}>
      <span className="w-2 h-2 rounded-full bg-white/30"></span>
      {displayText}
    </span>
  );
};

export default LanguageBadge;
