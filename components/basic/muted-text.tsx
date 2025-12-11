export function MutedText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm md:text-base text-slate-500">{children}</span>
  );
}
