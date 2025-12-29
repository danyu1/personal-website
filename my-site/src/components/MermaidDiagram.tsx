'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Initialize mermaid
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#f59e0b',
          primaryTextColor: '#fff',
          primaryBorderColor: '#f59e0b',
          lineColor: '#94a3b8',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          background: '#0f172a',
          mainBkg: '#1e293b',
          secondBkg: '#0f172a',
          textColor: '#e2e8f0',
          border1: '#334155',
          border2: '#475569',
        },
      })

      // Render the chart
      const renderChart = async () => {
        try {
          // Generate a valid CSS ID (no dots or special chars)
          const id = 'mermaid-' + Date.now() + '-' + Math.floor(Math.random() * 10000)
          const { svg } = await mermaid.render(id, chart)
          if (containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error)
        }
      }

      renderChart()
    }
  }, [chart])

  return <div ref={containerRef} className="flex justify-center items-center" />
}
