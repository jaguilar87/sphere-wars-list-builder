import type { Char } from "@/types";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import Image from "next/image";

export function DisplayableCharCard({
  char,
  faction,
  onPress,
}: {
  char: Char;
  faction: string;
  onPress: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={`/chars/${faction.toLowerCase()}/${char.key.toLowerCase()}.png`}
        alt={char.name}
        className="w-12 h-12 rounded-full border border-gray-500"
        height={48}
        width={48}
      />
      <div>
        <p className="font-semibold">{char.name}</p>
        <p className="text-sm text-gray-500">{char.title}</p>
      </div>
      <div className="flex flex-grow justify-end gap-4 items-center">
        <span className="text-lg text-slate-500">{char.cost}PBs</span>
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
