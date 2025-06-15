import type { Char } from "@/types";

import Image from "next/image";
import clsx from "clsx";

import { SelectableCard } from "./selectable-card";

export function CharCard({
  char,
  faction,
  isAffordable = true,
  onPress = () => {},
}: {
  char: Char;
  faction: string;
  isAffordable: boolean;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <Image
          alt="X"
          className="object-cover rounded-full border-1 border-gray-500"
          src={`/chars/${faction.toLocaleLowerCase()}/${char.key.toLocaleLowerCase()}.png`}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <span>{char.name}</span>
          <span className="text-sm text-gray-500">{char.title}</span>
          {char.domain && (
            <span className="text-sm text-warning-300">
              Dominio: {char.domain}
            </span>
          )}
        </div>
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
