"use client";

import type { Artifact, Char, Faction, Veterancy } from "@/types";

import React, { useState } from "react";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/card";

import { title } from "@/components/primitives";
import data from "@/data/data.json";
import { FactionCard } from "@/components/selectable-cards/faction-card";
import { CharCard } from "@/components/selectable-cards/char-card";
import { CardSelectionGrid } from "@/components/selectable-cards/card-selection-grid";
import { CostsBar } from "@/components/costs-bar/costs-bar";
import { SelectedCharCard } from "@/components/selected-cards/char-card";
import { VeterancyCard } from "@/components/selectable-cards/veterancy-card";
import { SelectedVeterancyCard } from "@/components/selected-cards/veterancy-card";
import { ArtifactCard } from "@/components/selectable-cards/artifact-card";
import { SelectedArtifactCard } from "@/components/selected-cards/artifact-card";
import { PickCta } from "@/components/basic/pick-cta";

export default function Home() {
  const [faction, setFaction] = useState<Faction | null>(null);
  const [leader, setLeader] = useState<Char | null>(null);
  const [pbs, setPBs] = useState(0);
  const [domain, setDomain] = useState(0);
  const [maxDomain, setMaxDomain] = useState(0);
  const [combatants, setCombats] = useState<Char[]>([]);
  const [veterancies, setVeterancies] = useState<Veterancy[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const remainingPbs = React.useMemo(() => 60 - pbs, [pbs]);
  const remainingDomain = React.useMemo(
    () => (leader ? maxDomain - domain : 0),
    [leader, domain, maxDomain],
  );
  const pickableOptions = React.useMemo(
    () =>
      data.factions
        .find((f) => f.key === faction?.key)
        ?.nonLeaders.filter((char) => !leader || `${leader.key}M` !== char.key)
        .filter(
          (char) =>
            !leader || !char.key.endsWith("B") || `${leader.key}B` === char.key,
        )
        .filter(
          (char) =>
            (!char.title.includes("Único") && !char.title.includes("Única")) ||
            !combatants.find((c) => c.key === char.key),
        )
        .sort((a, b) => {
          if (a.cost !== b.cost) return a.cost - b.cost;

          return a.name.localeCompare(b.name);
        }) || [],
    [faction, leader, combatants],
  );
  const pickableVeterancies = React.useMemo(
    () =>
      data.factions
        .find((f) => f.key === faction?.key)
        ?.veterancies.filter(
          (veterancy) => !veterancies.find((v) => v.name === veterancy.name),
        )
        .sort((a, b) => a.cost - b.cost) || [],
    [faction, veterancies],
  );
  const pickableArtifacts = React.useMemo(
    () =>
      data.factions
        .find((f) => f.key === faction?.key)
        ?.artifacts.filter(
          (artifact) => !artifacts.find((v) => v.name === artifact.name),
        )
        .sort((a, b) => a.cost - b.cost) || [],
    [faction, artifacts],
  );
  const getListInText = React.useCallback(() => {
    const lines: string[] = [];

    if (faction) {
      lines.push(`Facción: ${faction}`);
    }

    if (leader) {
      lines.push(`Líder: ${leader.name} - ${leader.cost}PBs`);
      lines.push("---");
    }

    if (artifacts.length > 0) {
      lines.push(
        ...artifacts.map(
          (artifact) => `${artifact.name} - ${artifact.cost}DOM`,
        ),
      );
      lines.push("---");
    }

    if (veterancies.length > 0) {
      lines.push(
        ...veterancies.map(
          (veterancy) => `${veterancy.name} - ${veterancy.cost}PBs`,
        ),
      );
    }
    if (combatants.length > 0) {
      lines.push(...combatants.map((char) => `${char.name} - ${char.cost}PBs`));
      lines.push("---");
    }
    lines.push(`Total: ${pbs}/60 PBs, ${domain}/${maxDomain} DOM`);

    return lines.join("\n");
  }, [
    faction,
    leader,
    artifacts,
    veterancies,
    combatants,
    pbs,
    domain,
    maxDomain,
  ]);

  const handleReset = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar la lista?")) {
      setFaction(null);
      setLeader(null);
      setCombats([]);
      setVeterancies([]);
      setArtifacts([]);
      setPBs(0);
      setDomain(0);
      setMaxDomain(0);
    }
  };

  const handlePickLeader = (leader: Char | null) => {
    setLeader(leader);
    setCombats([]);
    setVeterancies([]);
    setArtifacts([]);
    setPBs(leader?.cost || 0);
    setDomain(0);
    setMaxDomain(leader?.domain || 0);
  };

  const addCombatant = (char: Char) => {
    setPBs((prev) => prev + char.cost);
    setCombats((prev) => [...prev, char]);
  };

  const removeCombatant = (char: Char, pos: number) => {
    setPBs((prev) => prev - char.cost);
    setCombats((prev) => prev.filter((_, index) => index !== pos));
  };

  const addVetrancy = (veterancy: Veterancy) => {
    setPBs((prev) => prev + veterancy.cost);
    setVeterancies((prev) => [...prev, veterancy]);

    if (veterancy.name === "Artífice veterano") {
      setMaxDomain((prev) => prev + 1);
    }
  };

  const removeVeterancy = (veterancy: Veterancy, pos: number) => {
    setPBs((prev) => prev - veterancy.cost);
    setVeterancies((prev) => prev.filter((_, index) => index !== pos));

    if (veterancy.name === "Artífice veterano") {
      setMaxDomain((prev) => prev - 1);
    }
  };

  const addArtifact = (artifact: Artifact) => {
    setDomain((prev) => prev + artifact.cost);
    setArtifacts((prev) => [...prev, artifact]);
  };

  const removeArtifact = (artifact: Artifact, pos: number) => {
    setDomain((prev) => prev - artifact.cost);
    setArtifacts((prev) => prev.filter((_, index) => index !== pos));
  };

  if (!faction) {
    return (
      <section className="flex flex-col items-center justify-center gap-8">
        <CostsBar onReset={handleReset} />

        <PickCta>
          <span className={title()}>Elige una </span>
          <span className={title({ color: "violet" })}>facción</span>
        </PickCta>

        <CardSelectionGrid>
          {data.factions
            .filter((faction) => faction.name !== "Genérico")
            .map((faction) => (
              <FactionCard
                key={faction.key}
                faction={faction}
                onPress={() => setTimeout(() => setFaction(faction), 150)}
              />
            ))}
        </CardSelectionGrid>
      </section>
    );
  }

  const factionData = data.factions.find((f) => f.key === faction?.key);

  if (!leader) {
    return (
      <section className="flex flex-col items-center justify-center gap-8">
        <CostsBar pbs={pbs} onReset={handleReset} faction={faction} />

        <PickCta>
          <span className={title()}>Elige </span>
          <span className={title({ color: "blue" })}>líder</span>
        </PickCta>

        <CardSelectionGrid>
          {factionData?.leaders.map((leader) => (
            <CharCard
              key={leader.key}
              char={leader}
              faction={factionData}
              isAffordable
              onPress={() => setTimeout(() => handlePickLeader(leader), 150)}
            />
          ))}
        </CardSelectionGrid>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <CostsBar
        pbs={pbs}
        domain={domain}
        maxDomain={maxDomain}
        onReset={handleReset}
        onCopy={() => navigator.clipboard.writeText(getListInText())}
        faction={factionData}
      />

      <Card className="md:w-[75%] w-full bg-black border-1 border-slate-500">
        <CardBody className="gap-2">
          <SelectedCharCard
            char={leader}
            faction={factionData!}
            onPress={() => handlePickLeader(null)}
          />
          {artifacts.map((artifact, index) => (
            <SelectedArtifactCard
              key={`${artifact.name}-${index}`}
              artifact={artifact}
              faction={factionData!}
              onPress={() => removeArtifact(artifact, index)}
            />
          ))}
        </CardBody>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          {veterancies.map((vet, index) => (
            <SelectedVeterancyCard
              key={vet.name}
              veterancy={vet}
              faction={factionData!}
              onPress={() => removeVeterancy(vet, index)}
            />
          ))}
          {combatants.map((char, index) => (
            <SelectedCharCard
              key={`${char.key}-${index}`}
              char={char}
              faction={factionData!}
              onPress={() => removeCombatant(char, index)}
            />
          ))}
        </CardBody>
      </Card>

      <PickCta>
        <span className={title()}>Añade </span>
        <span className={title({ color: "cyan" })}>opciones</span>
      </PickCta>

      <CardSelectionGrid>
        {pickableVeterancies.map((veterancy) => (
          <VeterancyCard
            key={veterancy.name}
            veterancy={veterancy}
            faction={factionData!}
            isAffordable={veterancy.cost <= remainingPbs}
            onPress={() => {
              addVetrancy(veterancy);
            }}
          />
        ))}
        {pickableOptions.map((char) => (
          <CharCard
            key={char.key}
            char={char}
            faction={factionData!}
            isAffordable={char.cost <= remainingPbs}
            onPress={() => addCombatant(char)}
          />
        ))}
      </CardSelectionGrid>

      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Añade </span>
        <span className={title({ color: "yellow" })}>artefactos</span>
      </div>

      <CardSelectionGrid>
        {pickableArtifacts.map((artifact) => (
          <ArtifactCard
            key={artifact.name}
            artifact={artifact}
            faction={factionData!}
            isAffordable={artifact.cost <= remainingDomain}
            onPress={() => addArtifact(artifact)}
          />
        ))}
      </CardSelectionGrid>
    </section>
  );
}
