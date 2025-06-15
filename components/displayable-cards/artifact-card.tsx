import type { Artifact } from "@/types";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import Image from "next/image";

export function DisplayableArtifactCard({
  artifact,
  onPress,
}: {
  artifact: Artifact;
  onPress: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={`/icons/artifact.png`}
        alt={artifact.name}
        className="w-12 h-12 rounded-full border border-gray-500"
        height={48}
        width={48}
      />
      <p>{artifact.name}</p>
      <div className="flex flex-grow justify-end gap-4 items-center">
        <span className="text-lg text-slate-500">{artifact.cost}DOM</span>
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
