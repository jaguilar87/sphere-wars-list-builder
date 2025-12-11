import type { Char, Faction } from "@/types";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";

import { CharBox } from "@/components/basic/char-box";
import { MutedText } from "@/components/basic/muted-text";

export function SelectedCharCard({
  char,
  faction,
  onPress,
}: {
  char: Char;
  faction: Faction;
  onPress: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <CharBox char={char} faction={faction} />
      <div className="flex flex-grow justify-end gap-4 items-center">
        <MutedText>{char.cost}PBs</MutedText>
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
