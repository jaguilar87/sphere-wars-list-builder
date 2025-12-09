import type { Faction, Veterancy } from "@/types";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";

import { VeterancyBox } from "../basic/veterancy-box";

export function SelectedVeterancyCard({
  veterancy,
  faction,
  onPress,
}: {
  veterancy: Veterancy;
  faction: Faction;
  onPress: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <VeterancyBox veterancy={veterancy} faction={faction} />
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
