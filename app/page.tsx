"use client";

import type { Artifact, Char, Faction, Unit, Veterancy } from "@/types";

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
import { UnitCard } from "@/components/selectable-cards/unit-card";
import { calculateUnitCost, createMinimalUnit } from "@/utils/units";
import { SelectedUnitCard } from "@/components/selected-cards/unit-card";

export default function Home() {
  const [faction, setFaction] = useState<Faction | null>(null);
  const [leader, setLeader] = useState<Char | null>(null);
  const [pbs, setPBs] = useState(0);
  const [domain, setDomain] = useState(0);
  const [maxDomain, setMaxDomain] = useState(0);
  const [combatants, setCombats] = useState<Char[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [veterancies, setVeterancies] = useState<Veterancy[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const remainingPbs = React.useMemo(() => 60 - pbs, [pbs]);
  const remainingDomain = React.useMemo(
    () => (leader ? maxDomain - domain : 0),
    [leader, domain, maxDomain],
  );
  const pickableOptions = React.useMemo(
    () =>
      faction?.nonLeaders
        .filter((char) => !leader || `${leader.key}M` !== char.key)
        .filter(
          (char: Char) =>
            !char.dependsOnLeader || leader?.key === char.dependsOnLeader,
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
      faction?.veterancies
        .filter(
          (veterancy) => !veterancies.find((v) => v.name === veterancy.name),
        )
        .sort((a, b) => a.cost - b.cost) || [],
    [faction, veterancies],
  );
  const pickableArtifacts = React.useMemo(
    () =>
      faction?.artifacts
        .filter((artifact) => !artifacts.find((v) => v.name === artifact.name))
        .sort((a, b) => a.cost - b.cost) || [],
    [faction, artifacts],
  );
  const pickableUnits = React.useMemo(
    () =>
      faction?.units
        .filter(
          (unit) => !unit.unique || !units.find((v) => v.name === unit.name),
        )
        .filter(
          (unit) =>
            !unit.dependsOnLeader || leader?.key === unit.dependsOnLeader,
        )
        .map(createMinimalUnit)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    [faction, units],
  );
  const getListInText = React.useCallback(() => {
    const lines: string[] = [];

    if (faction) {
      lines.push(`Facción: ${faction.name}`);
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
    if (units.length > 0) {
      for (const unit of units) {
        lines.push(`${unit.name}:`);
        lines.push(
          ...unit.members.map(
            (member) =>
              `  - ${member.name} x${member.selected} - ${member.cost}PBs`,
          ),
        );
      }
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
      setUnits([]);
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
    setUnits([]);
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

  const addUnit = (minUnit: Unit) => {
    setPBs((prev) => prev + minUnit.minCost!);
    setUnits((prev) => [...prev, minUnit]);
  };

  const removeUnit = (unit: Unit, pos: number) => {
    setPBs((prev) => prev - calculateUnitCost(unit));
    setUnits((prev) => prev.filter((_, index) => index !== pos));
  };

  const addMemberToUnit = (pos: number, unit: Unit, unitKey: string) => {
    const memberToAdd = unit.members.find((member) => member.key === unitKey);

    if (!memberToAdd || memberToAdd.selected >= memberToAdd.max) {
      return;
    }

    setPBs((prev) => prev + memberToAdd.cost);
    setUnits((prev) =>
      prev.map((u, idx) => {
        if (idx !== pos) return u;

        return {
          ...u,
          members: u.members.map((member) => {
            if (member.key !== unitKey) return member;

            return { ...member, selected: member.selected + 1 };
          }),
        };
      }),
    );
  };

  const removeMemberFromUnit = (pos: number, unit: Unit, unitKey: string) => {
    const memberToRemove = unit.members.find(
      (member) => member.key === unitKey,
    );

    if (!memberToRemove || memberToRemove.selected <= memberToRemove.min) {
      return;
    }

    setPBs((prev) => prev - memberToRemove.cost);
    setUnits((prev) =>
      prev.map((u, idx) => {
        if (idx !== pos) return u;

        return {
          ...u,
          members: u.members.map((member) => {
            if (member.key !== unitKey) return member;

            return { ...member, selected: member.selected - 1 };
          }),
        };
      }),
    );
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
          {(data.factions as Faction[])
            .filter((faction) => faction.name !== "Genérico")
            .sort((a, b) => a.key.localeCompare(b.key))
            .map((faction) => (
              <FactionCard
                key={faction.key + faction.name}
                faction={faction}
                onPress={() => setTimeout(() => setFaction(faction), 150)}
              />
            ))}
        </CardSelectionGrid>
      </section>
    );
  }

  if (!leader) {
    return (
      <section className="flex flex-col items-center justify-center gap-8">
        <CostsBar pbs={pbs} onReset={handleReset} faction={faction} />

        <PickCta>
          <span className={title()}>Elige </span>
          <span className={title({ color: "blue" })}>líder</span>
        </PickCta>

        <CardSelectionGrid>
          {faction?.leaders.map((leader) => (
            <CharCard
              key={leader.key}
              char={leader}
              faction={faction}
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
        faction={faction}
      />

      <Card className="md:w-[75%] w-full bg-black border-1 border-slate-500">
        <CardBody className="gap-2">
          <SelectedCharCard
            char={leader}
            faction={faction}
            onPress={() => handlePickLeader(null)}
          />
          {artifacts.map((artifact, index) => (
            <SelectedArtifactCard
              key={`${artifact.name}-${index}`}
              artifact={artifact}
              faction={faction}
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
              faction={faction}
              onPress={() => removeVeterancy(vet, index)}
            />
          ))}
          {units.map((unit, index) => (
            <SelectedUnitCard
              key={`${unit.name}-${index}`}
              unit={unit}
              faction={faction}
              onDeleteUnit={() => removeUnit(unit, index)}
              onAddMember={(unit, memberKey) =>
                addMemberToUnit(index, unit, memberKey)
              }
              onRemoveMember={(unit, memberKey) =>
                removeMemberFromUnit(index, unit, memberKey)
              }
            />
          ))}
          {combatants.map((char, index) => (
            <SelectedCharCard
              key={`${char.key}-${index}`}
              char={char}
              faction={faction}
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
            faction={faction}
            isAffordable={veterancy.cost <= remainingPbs}
            onPress={() => {
              addVetrancy(veterancy);
            }}
          />
        ))}
        {pickableUnits.map((unit) => (
          <UnitCard
            key={unit.name}
            unit={createMinimalUnit(unit)}
            faction={faction}
            isAffordable={unit.minCost! <= remainingPbs}
            onPress={() => addUnit(unit)}
          />
        ))}
        {pickableOptions.map((char) => (
          <CharCard
            key={char.key}
            char={char}
            faction={faction}
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
            faction={faction}
            isAffordable={artifact.cost <= remainingDomain}
            onPress={() => addArtifact(artifact)}
          />
        ))}
      </CardSelectionGrid>
    </section>
  );
}
