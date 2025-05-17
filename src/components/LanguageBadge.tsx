
import React from 'react';

type LanguageProps = {
  language: string;
};

const languageColors: Record<string, string> = {
  javascript: 'bg-yellow-400 text-black',
  python: 'bg-blue-600 text-white',
  typescript: 'bg-blue-500 text-white',
  html: 'bg-orange-500 text-white',
  css: 'bg-blue-400 text-white',
  ruby: 'bg-red-600 text-white',
  go: 'bg-blue-300 text-white',
  java: 'bg-red-400 text-white',
  csharp: 'bg-green-600 text-white',
  php: 'bg-indigo-500 text-white',
  swift: 'bg-orange-600 text-white',
  rust: 'bg-orange-700 text-white',
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
    <span className={`language-badge ${colorClass} flex items-center gap-1.5 shadow-sm`}>
      <span className="w-2 h-2 rounded-full bg-white/40"></span>
      {displayText}
    </span>
  );
};

export default LanguageBadge;
