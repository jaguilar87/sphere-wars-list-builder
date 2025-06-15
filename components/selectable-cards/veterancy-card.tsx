import type { Veterancy } from "@/types";

import Image from "next/image";
import clsx from "clsx";

import { SelectableCard } from "./selectable-card";

export function VeterancyCard({
  veterancy,
  isAffordable = true,
  onPress = () => {},
}: {
  veterancy: Veterancy;
  isAffordable: boolean;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <Image
          alt="X"
          className="object-cover rounded-full border-1 border-gray-500"
          src={`/icons/veterancy.png`}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <span>{veterancy.name}</span>
        </div>
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
