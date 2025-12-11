export function MutedText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-sm md:text-base text-slate-500 ${className}`}>
      {children}
    </span>
  );
}
