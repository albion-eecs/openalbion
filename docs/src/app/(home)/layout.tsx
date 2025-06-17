import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      style={
        {
          '--spacing-fd-container': '1120px',
        } as object
      }
      links={[
        {
          text: 'Documentation',
          url: '/docs/api',
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
