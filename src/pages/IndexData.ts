
import { Snippet } from '../components/SnippetCard';

// Mock data for demo
export const mockSnippets: Snippet[] = [
  {
    id: '1',
    title: 'Fetch API with error handling',
    description: 'A reusable fetch wrapper with proper error handling and timeout',
    language: 'javascript',
    code: `async function fetchWithTimeout(url, options = {}) {
  const { timeout = 8000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(\`HTTP Error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}`,
    tags: [
      { name: 'api', type: 'auto' },
      { name: 'error-handling', type: 'auto' },
      { name: 'async', type: 'user' },
      { name: 'fetch', type: 'user' },
    ],
    usageCount: 23,
    createdAt: '2023-09-15T14:48:00.000Z',
  },
  {
    id: '2',
    title: 'React useEffect cleanup',
    description: 'Pattern for proper cleanup in useEffect hooks',
    language: 'typescript',
    code: `useEffect(() => {
  // Setup subscription or event listener
  const subscription = someAPI.subscribe();
  
  // Cleanup function to prevent memory leaks
  return () => {
    subscription.unsubscribe();
  };
}, [someAPI]);`,
    tags: [
      { name: 'react', type: 'auto' },
      { name: 'hooks', type: 'auto' },
      { name: 'cleanup', type: 'user' },
    ],
    usageCount: 17,
    createdAt: '2023-10-02T09:22:00.000Z',
  },
  {
    id: '3',
    title: 'Array map with type safety',
    description: 'Map over arrays with proper TypeScript typing',
    language: 'typescript',
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

const userNames: string[] = users.map((user) => user.name);`,
    tags: [
      { name: 'array-methods', type: 'auto' },
      { name: 'typescript', type: 'auto' },
      { name: 'mapping', type: 'user' },
    ],
    usageCount: 9,
    createdAt: '2023-11-14T16:30:00.000Z',
  },
  {
    id: '4',
    title: 'Python list comprehension',
    description: 'Elegant way to create lists in Python',
    language: 'python',
    code: `# Create a new list with squared values
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(squared)  # [1, 4, 9, 16, 25]

# With conditional filtering
even_squared = [x**2 for x in numbers if x % 2 == 0]
print(even_squared)  # [4, 16]`,
    tags: [
      { name: 'python', type: 'auto' },
      { name: 'list-comprehension', type: 'user' },
      { name: 'array-methods', type: 'auto' },
    ],
    usageCount: 14,
    createdAt: '2023-08-27T11:15:00.000Z',
  },
  {
    id: '5',
    title: 'React custom hook for localStorage',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
    tags: [
      { name: 'react', type: 'auto' },
      { name: 'hooks', type: 'auto' },
      { name: 'storage', type: 'user' },
      { name: 'typescript', type: 'auto' },
    ],
    usageCount: 31,
    createdAt: '2023-07-05T08:40:00.000Z',
  },
  {
    id: '6',
    title: 'CSS Grid layout',
    language: 'css',
    code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.item {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}`,
    tags: [
      { name: 'css', type: 'auto' },
      { name: 'grid', type: 'user' },
      { name: 'responsive', type: 'user' },
    ],
    usageCount: 19,
    createdAt: '2023-09-29T13:20:00.000Z',
  },
];

export const mockLanguages = [
  { name: 'JavaScript', count: 42 },
  { name: 'TypeScript', count: 28 },
  { name: 'Python', count: 15 },
  { name: 'CSS', count: 12 },
  { name: 'HTML', count: 8 },
  { name: 'Java', count: 5 },
  { name: 'Ruby', count: 3 },
];

export const mockTags = [
  { name: 'api', type: 'auto' as const, count: 17 },
  { name: 'array-methods', type: 'auto' as const, count: 14 },
  { name: 'react', type: 'auto' as const, count: 26 },
  { name: 'hooks', type: 'auto' as const, count: 18 },
  { name: 'typescript', type: 'auto' as const, count: 23 },
  { name: 'error-handling', type: 'auto' as const, count: 11 },
  { name: 'async', type: 'user' as const, count: 19 },
  { name: 'fetch', type: 'user' as const, count: 13 },
  { name: 'debugging', type: 'auto' as const, count: 9 },
  { name: 'functions', type: 'user' as const, count: 21 },
  { name: 'cleanup', type: 'user' as const, count: 7 },
  { name: 'storage', type: 'user' as const, count: 15 },
  { name: 'responsive', type: 'user' as const, count: 8 },
  { name: 'grid', type: 'user' as const, count: 6 },
  { name: 'mapping', type: 'user' as const, count: 12 },
];

export const mockFolders = [
  {
    id: 'f1',
    name: 'React',
    snippetCount: 24,
    subfolders: [
      { id: 'f1-1', name: 'Hooks', snippetCount: 14 },
      { id: 'f1-2', name: 'Components', snippetCount: 10 },
    ],
  },
  {
    id: 'f2',
    name: 'API',
    snippetCount: 18,
    subfolders: [
      { id: 'f2-1', name: 'Authentication', snippetCount: 5 },
      { id: 'f2-2', name: 'Endpoints', snippetCount: 13 },
    ],
  },
  {
    id: 'f3',
    name: 'Utilities',
    snippetCount: 31,
    subfolders: []
  },
  {
    id: 'f4',
    name: 'CSS Tricks',
    snippetCount: 16,
    subfolders: [],
  },
];
