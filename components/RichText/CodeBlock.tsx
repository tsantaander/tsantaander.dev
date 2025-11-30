'use client';

import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { File } from 'lucide-react';
import {
  Code,
  CodeBlock as CodeBlockAnimated,
  CodeHeader,
} from '@/components/animate-ui/components/animate/code';

// Configuración inicial de Mermaid
if (typeof window !== 'undefined') {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
  });
}

type CodeBlockProps = {
  language: string;
  code: string;
  className?: string;
};

// Mapeo de abreviaturas a nombres completos de lenguajes
const getLanguageName = (language: string): string => {
  const langMap: Record<string, string> = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    tsx: 'TypeScript (React)',
    jsx: 'JavaScript (React)',
    py: 'Python',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    csharp: 'C#',
    cs: 'C#',
    go: 'Go',
    rust: 'Rust',
    ruby: 'Ruby',
    php: 'PHP',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'Sass',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    xml: 'XML',
    sql: 'SQL',
    bash: 'Bash',
    sh: 'Shell',
    shell: 'Shell',
    markdown: 'Markdown',
    md: 'Markdown',
    dockerfile: 'Dockerfile',
    docker: 'Docker',
    text: 'Text',
  };

  return langMap[language?.toLowerCase()] || language?.toUpperCase() || 'Code';
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'text', code = '', className = '' }) => {
  const [mermaidSvg, setMermaidSvg] = useState('');
  const [isMermaid, setIsMermaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const isMermaidDiagram = language?.toLowerCase() === 'mermaid' || language === 'mm';
    setIsMermaid(isMermaidDiagram);

    if (isMermaidDiagram && typeof window !== 'undefined') {
      const renderMermaid = async () => {
        try {
          mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
          });

          const container = document.createElement('div');
          container.style.visibility = 'hidden';
          container.style.position = 'absolute';
          document.body.appendChild(container);
          
          try {
            const { svg } = await mermaid.render('mermaid-svg-' + Date.now(), code, container);
            setMermaidSvg(svg);
            setError(null);
          } finally {
            if (document.body.contains(container)) {
              document.body.removeChild(container);
            }
          }
        } catch (err) {
          console.error('Error rendering Mermaid diagram:', err);
          setError('Error al renderizar el diagrama Mermaid: ' + (err instanceof Error ? err.message : String(err)));
        }
      };

      const timer = setTimeout(() => {
        renderMermaid();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [language, code, isDark]);

  // Si es un diagrama Mermaid
  if (isMermaid) {
    if (mermaidSvg) {
      return (
        <div 
          className={`mermaid-container my-6 ${className}`}
          dangerouslySetInnerHTML={{ __html: mermaidSvg }}
          style={{ minHeight: '100px' }}
        />
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 my-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto text-xs">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4" style={{ minHeight: '100px' }}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Para código normal usando el componente animado
  return (
    <Code className={`my-6 max-h-[500px] ${className}`} code={code}>
      <CodeHeader icon={File} copyButton>
        {getLanguageName(language)}
      </CodeHeader>
      <CodeBlockAnimated
        lang={language || 'text'}
        writing={true}
        duration={3000}
        delay={200}
        cursor={true}
        inView={true}
        inViewOnce={false}
        inViewMargin="-100px"
      />
    </Code>
  );
};

export default CodeBlock;
