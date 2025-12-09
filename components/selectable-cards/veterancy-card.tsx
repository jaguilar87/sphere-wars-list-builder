import type { Faction, Veterancy } from "@/types";

import clsx from "clsx";

import { SelectableCard } from "./selectable-card";

import { VeterancyBox } from "@/components/basic/veterancy-box";

export function VeterancyCard({
  veterancy,
  isAffordable = true,
  faction,
  onPress = () => {},
}: {
  veterancy: Veterancy;
  isAffordable: boolean;
  faction: Faction;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <VeterancyBox veterancy={veterancy} faction={faction} />
        <span
          className={clsx("text-lg grow text-right", {
            ["text-gray-600"]: !isAffordable,
            ["text-secondary-500"]: isAffordable,
          })}
        >
          {veterancy.cost}PBs
        </span>
      </div>
    </SelectableCard>
  );
}
