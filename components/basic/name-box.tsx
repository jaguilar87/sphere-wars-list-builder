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
      <p>{name}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {domain && (
        <span className="text-sm text-warning-300">Dominio: {domain}</span>
      )}
    </div>
  );
}
