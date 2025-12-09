import type { Faction } from "@/types";

import { Avatar } from "./avatar";
import { NameBox } from "./name-box";

export function FactionBox({
  faction,
}: {
  faction: Faction;
  reference: string;
}) {
  return (
    <>
      <Avatar
        src={`/factions/${faction.key.toLocaleLowerCase()}.png`}
        alt={faction.key}
      />
      <NameBox name={faction.name} />
    </>
  );
}
