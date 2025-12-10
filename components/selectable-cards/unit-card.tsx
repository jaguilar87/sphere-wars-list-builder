import type { Faction, Unit } from "@/types";

import clsx from "clsx";

import { SelectableCard } from "./selectable-card";

import { UnitBox } from "@/components/basic/unit-box";

export function UnitCard({
  unit,
  faction,
  isAffordable = true,
  onPress = () => {},
}: {
  unit: Unit;
  faction: Faction;
  isAffordable: boolean;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <UnitBox unit={unit} faction={faction} />
        <span
          className={clsx("text-lg grow text-right", {
            ["text-gray-600"]: !isAffordable,
            ["text-secondary-500"]: isAffordable,
          })}
        >
          {unit.minCost}-{unit.maxCost}PBs
        </span>
      </div>
    </SelectableCard>
  );
}
