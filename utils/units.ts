import type { Unit } from "@/types";

export function createMinimalUnit(unitData: any): Unit {
  return {
    ...unitData,
    members: unitData.members.map((member: any) => ({
      ...member,
      selected: member.min,
    })),
    minCost: unitData.members.reduce(
      (total: number, member: any) => total + member.cost * member.min,
      0,
    ),
    maxCost: unitData.members.reduce(
      (total: number, member: any) => total + member.cost * member.max,
      0,
    ),
  };
}

export function calculateUnitCost(unit: Unit) {
  return unit.members.reduce(
    (total, member) => total + member.cost * member.selected,
    0,
  );
}
