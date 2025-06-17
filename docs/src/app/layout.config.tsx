import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={16}
      height={16}
    />
  );
}

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Logo />
        <span className="font-medium max-md:hidden">OpenAlbion</span>
      </>
    )
  },
  githubUrl: 'https://github.com/albion-eecs/openalbion'
};
