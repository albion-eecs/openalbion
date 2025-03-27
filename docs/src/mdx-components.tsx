import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import type { MDXComponents } from 'mdx/types'
import React from 'react'

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="custom-table-container" style={{ overflowX: 'auto', width: '100%' }}>
      <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 }}>
        {children}
      </table>
    </div>
  )
}

const Thead = ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>
const Tbody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>
const Tr = ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>
const Th = ({ children }: { children: React.ReactNode }) => (
  <th style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
    {children}
  </th>
)
const Td = ({ children }: { children: React.ReactNode }) => (
  <td style={{ padding: '0.75rem 1rem' }}>
    {children}
  </td>
)

const themeComponents = getThemeComponents()
 
export function useMDXComponents(components: MDXComponents) {
  return {
    ...themeComponents,
    ...components,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td
  }
}