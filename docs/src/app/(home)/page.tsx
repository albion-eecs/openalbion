import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-4xl font-mono">
        <div className="mb-8">
          <p>Welcome to the OpenAlbion Documentation</p>
          <p>
            Last Login: {new Date().toUTCString()} on{' '}
            <span className="text-purple-500">openalbion.local</span>
          </p>
        </div>

        <div className="mb-8">
          <p className="mb-2">Documentation:</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">--&gt;</span>
            <Link
              href="/docs/api"
              className="text-primary hover:underline"
            >
              v1 API
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-2">General:</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">--&gt;</span>
            <Link
              href="https://openalbion.org/security"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Security
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">--&gt;</span>
            <Link
              href="https://openalbion.org/privacy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">--&gt;</span>
            <Link
              href="https://openalbion.org/terms"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">--&gt;</span>
            <Link
              href="https://openalbion.org/contact"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">--&gt;</span>
            <Link
              href="https://openalbion.org/changelog"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Changelog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
