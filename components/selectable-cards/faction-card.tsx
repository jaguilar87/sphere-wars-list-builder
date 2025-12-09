import type { Faction } from "@/types";

import { SelectableCard } from "./selectable-card";

import { FactionBox } from "@/components/basic/faction-box";

export function FactionCard({
  faction,
  onPress = () => {},
}: {
  faction: Faction;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <FactionBox faction={faction} reference={faction.key} />
      </div>
    </SelectableCard>
  );
}
