export function CardSelectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-wrap gap-4 justify-center mb-4 w-full">
      {children}
    </section>
  );
}
