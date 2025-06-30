interface AlertErrorProps {
  message: string | null;
  className?: string;
}

export function AlertError({ message, className = "" }: AlertErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20 relative z-10 ${className}`}
    >
      {message}
    </div>
  );
}
