'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

const MermaidRenderer = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark', // o 'dark', 'neutral', 'default'
      securityLevel: 'loose',
    })
    mermaid.run({
      nodes: document.querySelectorAll('.language-mermaid'),
    })
  }, [])

  return null
}

export default MermaidRenderer
