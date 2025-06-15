import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export function PBsBar({
  pbs,
  domain = 0,
  maxDomain,
  faction,
  onReset = () => {},
  onShare = () => {},
}: {
  pbs?: number;
  domain?: number;
  maxDomain?: number;
  faction?: string;
  onReset?: () => void;
  onShare?: () => void;
}) {
  const isPbsOverLimit = (pbs || 0) > 60;
  const isDomainOverLimit = domain > (maxDomain || 0);

  return (
    <div className="w-full flex items-center gap-2 sticky top-0 z-40 bg-black py-2 border-b-slate-800 border-b-1">
      <Image
        className="rounded-full flex-grow-0"
        alt="SphereWars"
        src="/logo.png"
        width={48}
        height={48}
      />
      {faction && (
        <Button
          className="flex-grow-0 relative"
          variant="light"
          color="danger"
          size="lg"
          radius="full"
          isIconOnly
          onPress={onReset}
        >
          <Image
            alt="X"
            className="absolute object-cover rounded-full"
            src={`/factions/${faction.toLocaleLowerCase()}.png`}
            width={48}
            height={48}
            onClick={onReset}
          />
          <TrashIcon className="opacity-0 hover:opacity-100 z-10 absolute w-8 h-8" />
        </Button>
      )}

      {typeof pbs !== "undefined" ? (
        <Progress
          className="w-full flex-grow-[4] mx-2"
          color={isPbsOverLimit ? "danger" : "success"}
          label="PBs"
          valueLabel={`${pbs} / 60`}
          showValueLabel={true}
          size="md"
          maxValue={60}
          value={pbs}
        />
      ) : (
        <div className="w-full" />
      )}
      {maxDomain && (
        <Progress
          className="w-full flex-grow mx-2"
          color={isDomainOverLimit ? "danger" : "warning"}
          label="Dominio"
          valueLabel={`${domain} / ${maxDomain}`}
          showValueLabel={true}
          size="md"
          maxValue={maxDomain}
          value={domain}
        />
      )}
      {Boolean(faction && typeof pbs !== "undefined" && maxDomain) && (
        <Button
          className="flex-grow-0"
          isIconOnly
          variant="ghost"
          radius="full"
          color="primary"
          title="Compartir"
          onPress={onShare}
        >
          <DocumentDuplicateIcon className="h-4 w-4" />
        </Button>
      )}
      <Button
        className="flex-grow-0"
        isIconOnly
        variant="ghost"
        radius="full"
        color="secondary"
        title="Reiniciar"
        onPress={onReset}
      >
        <ArrowPathIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
