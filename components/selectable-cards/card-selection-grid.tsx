export function CardSelectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-wrap gap-4 mb-4 mx-auto md:w-[75%] w-full">
      {children}
    </section>
  );
}
