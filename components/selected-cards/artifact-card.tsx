import type { Artifact, Faction } from "@/types";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";

import { ArtifactBox } from "../basic/artifact-box";
import { MutedText } from "../basic/muted-text";

export function SelectedArtifactCard({
  artifact,
  faction,
  onPress,
}: {
  artifact: Artifact;
  faction: Faction;
  onPress: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <ArtifactBox artifact={artifact} faction={faction} />
      <div className="flex flex-grow justify-end gap-4 items-center">
        <MutedText>{artifact.cost}DOM</MutedText>
        <Button
          variant="ghost"
          isIconOnly
          color="danger"
          radius="full"
          size="md"
          onPress={onPress}
        >
          <TrashIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
