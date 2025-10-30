'use client'

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar dinámicamente el componente CodeBlock para evitar problemas con SSR
const CodeBlock = dynamic(() => import('./CodeBlock'), { ssr: false });

// Definir tipos para el contenido de rich text
type RichTextNode = {
  type?: string
  text?: string
  children?: RichTextNode[]
  [key: string]: any
  tag?: string
  format?: number
  detail?: number
  mode?: string
  style?: string
  version?: number
  direction?: string | null
  indent?: number
  fields?: Record<string, any>
}

type RichTextContent = {
  root: {
    children: RichTextNode[]
  }
}

interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RichTextContent
  className?: string
}

// Componente para renderizar nodo de texto
const TextNode: React.FC<{ node: RichTextNode }> = ({ node }) => {
  if (!node.text) return null;
  
  let className = '';
  
  // Aplicar estilos de formato
  if (node.format && node.format & 1) className += 'font-bold ';
  if (node.format && node.format & 2) className += 'italic ';
  if (node.format && node.format & 4) className += 'underline ';
  if (node.format && node.format & 8) className += 'line-through ';
  
  return <span className={className.trim() || undefined}>{node.text}</span>;
};

// Tipos de elementos HTML permitidos
type HTMLElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'ul' | 'ol' | 'li' | 'span' | 'blockquote';

// Componente para renderizar nodos de manera recursiva
const RichTextNode: React.FC<{ node: RichTextNode }> = ({ node }) => {
  if (!node) return null;

  // Si es un nodo de texto
  if (node.text !== undefined) {
    return <TextNode node={node} />;
  }

  // Si es un enlace
  if (node.type === 'autolink' || node.fields?.linkType) {
    return (
      <a 
        href={node.fields?.url || '#'} 
        className="text-blue-600 dark:text-blue-400 hover:underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {node.children?.map((child, i) => (
          <RichTextNode key={i} node={child} />
        ))}
      </a>
    );
  }

  // Si es una lista
  if (node.type === 'list') {
    const ListTag = node.tag === 'ol' ? 'ol' : 'ul';
    return (
      <ListTag className={`${node.tag === 'ol' ? 'list-decimal' : 'list-disc'} pl-6 my-4`}>
        {node.children?.map((child, i) => (
          <li key={i} className="mb-2">
            <RichTextNode node={child} />
          </li>
        ))}
      </ListTag>
    );
  }

  // Si es un elemento de lista
  if (node.type === 'listitem') {
    return <>{node.children?.map((child, i) => <RichTextNode key={i} node={child} />)}</>;
  }

  // Si es un encabezado
  if (node.type === 'heading' || (node.type && node.type.startsWith('heading-'))) {
    let tag = 'h2';
    if (node.tag) {
      tag = node.tag;
    } else if (node.type.startsWith('heading-')) {
      const level = parseInt(node.type.replace('heading-', ''), 10);
      tag = `h${Math.min(6, Math.max(1, level))}`;
    }
    
    const Tag = tag as HTMLElements;
    
    return (
      <Tag className={`${tag === 'h1' ? 'text-3xl' : tag === 'h2' ? 'text-2xl' : 'text-xl'} font-bold my-6`}>
        {node.children?.map((child, i) => (
          <RichTextNode key={i} node={child} />
        ))}
      </Tag>
    );
  }

  // Si es una cita
  if (node.type === 'quote') {
    return (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic">
        {node.children?.map((child, i) => (
          <RichTextNode key={i} node={child} />
        ))}
      </blockquote>
    );
  }

  // Si es una línea horizontal
  if (node.type === 'horizontalrule') {
    return <hr className="my-6 border-gray-200 dark:border-gray-700" />;
  }

  // Si es un bloque de código de Payload CMS (nueva estructura con 'Code' en mayúscula)
  if (node.type === 'block' && node.fields?.blockType === 'Code') {
    const language = node.fields.language?.toLowerCase() || 'text';
    const code = node.fields.code || '';
    
    return (
      <CodeBlock 
        language={language}
        code={code}
        className="my-6"
      />
    );
  }

  // Si es un bloque de código estándar (estructura antigua con 'code' en minúscula)
  if (node.type === 'code' || (node.type === 'block' && node.fields?.blockType === 'code')) {
    const language = node.language || node.fields?.language || 'text';
    const code = node.code || node.fields?.code || '';
    
    return (
      <CodeBlock 
        language={language}
        code={code}
        className={node.className}
      />
    );
  }

  // Si es un párrafo o cualquier otro tipo de nodo con children
  if (node.children) {
    const Tag = (node.type === 'paragraph' ? 'p' : 'div') as HTMLElements;
    return (
      <Tag className="mb-4">
        {node.children.map((child, i) => (
          <RichTextNode key={i} node={child} />
        ))}
      </Tag>
    );
  }

  return null;
};

const RichText: React.FC<RichTextProps> = ({ className = '', data, ...rest }) => {
  if (!data?.root?.children) return null;

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`} {...rest}>
      {data.root.children.map((node, i) => (
        <RichTextNode key={i} node={node} />
      ))}
    </div>
  );
};

export default RichText;