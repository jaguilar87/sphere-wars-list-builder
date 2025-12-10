import type { Faction, Unit } from "@/types";

import { Avatar } from "./avatar";
import { NameBox } from "./name-box";

export function UnitBox({ unit, faction }: { unit: Unit; faction: Faction }) {
  return (
    <>
      <Avatar
        src={`/chars/${faction.key.toLocaleLowerCase()}/${unit.members[0].key.toLowerCase()}.png`}
        alt={unit.name}
      />
      <NameBox name={unit.name} subtitle="Unidad" />
    </>
  );
}
