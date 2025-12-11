export function NameBox({
  name,
  subtitle,
  domain,
}: {
  name: string;
  subtitle?: string;
  domain?: string;
}) {
  return (
    <div>
      <p className="text-sm md:text-base">{name}</p>
      {subtitle && (
        <p className="text-xs md:text-sm text-gray-500">{subtitle}</p>
      )}
      {domain && (
        <span className="text-xs md:text-sm text-warning-300">
          Dominio: {domain}
        </span>
      )}
    </div>
  );
}
