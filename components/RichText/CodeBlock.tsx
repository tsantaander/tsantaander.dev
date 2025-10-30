'use client';

import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';

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
          // Configuración de Mermaid
          mermaid.initialize({
            startOnLoad: false, // Desactivar carga automática
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
          });

          // Crear un contenedor temporal para el renderizado
          const container = document.createElement('div');
          container.style.visibility = 'hidden';
          container.style.position = 'absolute';
          document.body.appendChild(container);
          
          try {
            // Renderizar el diagrama
            const { svg } = await mermaid.render('mermaid-svg-' + Date.now(), code, container);
            setMermaidSvg(svg);
            setError(null);
          } finally {
            // Limpiar el contenedor temporal
            if (document.body.contains(container)) {
              document.body.removeChild(container);
            }
          }
        } catch (err) {
          console.error('Error rendering Mermaid diagram:', err);
          setError('Error al renderizar el diagrama Mermaid: ' + (err instanceof Error ? err.message : String(err)));
        }
      };

      // Retrasar ligeramente la renderización para asegurar que el componente esté montado
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
          style={{ minHeight: '100px' }} // Altura mínima para evitar saltos de diseño
        />
      );
    }
    
    // Mostrar código Mermaid sin renderizar si hay un error
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

    // Mostrar placeholder mientras se carga Mermaid
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4" style={{ minHeight: '100px' }}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Para otros lenguajes de programación
  if (language === 'mermaid' || language === 'mm') {
    return (
      <div className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="mermaid">
          {code}
        </div>
      </div>
    );
  }

  // Para código normal
  return (
    <div className={`my-6 rounded-lg overflow-hidden ${className}`}>
      {language && language !== 'text' && (
        <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono">
          {language}
        </div>
      )}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4 overflow-x-auto`}>
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
