import Image from "next/image";

import { SelectableCard } from "./selectable-card";

export function FactionCard({
  name,
  reference,
  onPress = () => {},
}: {
  name: string;
  reference: string;
  onPress?: () => void;
}) {
  return (
    <SelectableCard onPress={onPress}>
      <div className="flex items-center gap-4">
        <Image
          alt="X"
          className="object-cover"
          src={`/factions/${reference.toLocaleLowerCase()}.png`}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <span>{name}</span>
        </div>
      </div>
    </SelectableCard>
  );
}
