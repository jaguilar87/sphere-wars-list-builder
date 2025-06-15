import type { Veterancy } from "@/types";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import Image from "next/image";

export function DisplayableVeterancyCard({
  veterancy,
  onPress,
}: {
  veterancy: Veterancy;
  onPress: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={`/icons/veterancy.png`}
        alt={veterancy.name}
        className="w-12 h-12 rounded-full border border-gray-500"
        height={48}
        width={48}
      />
      <p>{veterancy.name}</p>
      <div className="flex flex-grow justify-end gap-4 items-center">
        <span className="text-lg text-slate-500">{veterancy.cost}PBs</span>
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
