import type { Faction, Veterancy } from "@/types";

import { Avatar } from "./avatar";
import { NameBox } from "./name-box";

export function VeterancyBox({
  veterancy,
  faction,
}: {
  veterancy: Veterancy;
  faction: Faction;
}) {
  return (
    <>
      <Avatar
        src={`/icons/${faction.key.toLocaleLowerCase()}/habilidad.png`}
        alt={veterancy.name}
      />
      <NameBox name={veterancy.name} subtitle="Veteranía" />
    </>
  );
}
