/* eslint-disable no-unused-vars */
import type { Faction, Unit } from "@/types";

import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";

import { NameBox } from "@/components/basic/name-box";
import { calculateUnitCost } from "@/utils/units";
import { CharBox } from "@/components/basic/char-box";
import { MutedText } from "@/components/basic/muted-text";

export function SelectedUnitCard({
  unit,
  faction,
  onDeleteUnit,
  onAddMember,
  onRemoveMember,
}: {
  unit: Unit;
  faction: Faction;
  onDeleteUnit: () => void;
  onAddMember: (unit: Unit, memberKey: string) => void;
  onRemoveMember: (unit: Unit, memberKey: string) => void;
}) {
  const unitCost = calculateUnitCost(unit);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 w-full">
        <NameBox name={unit.name} subtitle="Unidad" />
        <div className="flex flex-grow justify-end gap-4 items-center">
          <MutedText>{unitCost}PBs</MutedText>
          <Button
            variant="ghost"
            isIconOnly
            color="danger"
            radius="full"
            size="md"
            onPress={onDeleteUnit}
          >
            <TrashIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
      {unit.members.map((member) => (
        <div
          className="flex flex-row items-center gap-4 w-full pl-2 md:pl-8"
          key={member.key}
        >
          <CharBox char={member} faction={faction} />
          <div className="flex flex-grow justify-end gap-4 items-center">
            <Button
              variant="ghost"
              isIconOnly
              color="secondary"
              radius="full"
              size="md"
              onPress={() => onRemoveMember(unit, member.key)}
            >
              <MinusIcon className="w-6 h-6" />
            </Button>
            <MutedText>
              {member.selected} x {member.cost}PBs
            </MutedText>
            <Button
              variant="ghost"
              isIconOnly
              color="secondary"
              radius="full"
              size="md"
              onPress={() => onAddMember(unit, member.key)}
            >
              <PlusIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
