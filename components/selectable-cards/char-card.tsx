import type { Char, Faction } from "@/types";

import clsx from "clsx";

import { SelectableCard } from "./selectable-card";

import { CharBox } from "@/components/basic/char-box";

export function CharCard({
  char,
  faction,
  isAffordable = true,
  onPress = () => {},
}: {
  char: Char;
  faction: Faction;
  isAffordable: boolean;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <CharBox char={char} faction={faction} domain />
        <span
          className={clsx("text-lg grow text-right", {
            ["text-gray-600"]: !isAffordable,
            ["text-secondary-500"]: isAffordable,
          })}
        >
          {char.cost}PBs
        </span>
      </div>
    </SelectableCard>
  );
}
