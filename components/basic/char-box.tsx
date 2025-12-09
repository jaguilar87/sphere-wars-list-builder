import type { Char, Faction } from "@/types";

import { Avatar } from "./avatar";
import { NameBox } from "./name-box";

export function CharBox({
  char,
  faction,
  domain,
}: {
  char: Char;
  faction: Faction;
  domain?: boolean;
}) {
  return (
    <>
      <Avatar
        src={`/chars/${faction.key.toLocaleLowerCase()}/${char.key.toLowerCase()}.png`}
        alt={char.name}
      />
      <NameBox
        name={char.name}
        subtitle={char.title}
        domain={domain ? char.domain?.toString() : undefined}
      />
    </>
  );
}
