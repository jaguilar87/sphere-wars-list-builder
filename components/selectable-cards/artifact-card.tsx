import type { Artifact, Faction } from "@/types";

import clsx from "clsx";

import { SelectableCard } from "./selectable-card";

import { ArtifactBox } from "@/components/basic/artifact-box";

export function ArtifactCard({
  artifact,
  isAffordable = true,
  faction,
  onPress = () => {},
}: {
  artifact: Artifact;
  isAffordable: boolean;
  faction: Faction;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <ArtifactBox artifact={artifact} faction={faction} />
        <span
          className={clsx("text-lg grow text-right", {
            ["text-gray-600"]: !isAffordable,
            ["text-warning-200"]: isAffordable,
          })}
        >
          {artifact.cost}DOM
        </span>
      </div>
    </SelectableCard>
  );
}
