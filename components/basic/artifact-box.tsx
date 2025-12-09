import type { Artifact, Faction } from "@/types";

import { Avatar } from "./avatar";
import { NameBox } from "./name-box";

export function ArtifactBox({
  artifact,
  faction,
}: {
  artifact: Artifact;
  faction: Faction;
}) {
  return (
    <>
      <Avatar
        src={`/icons/${faction.key.toLocaleLowerCase()}/artefacto.png`}
        alt={artifact.name}
      />
      <NameBox name={artifact.name} subtitle="Artefacto" />
    </>
  );
}
