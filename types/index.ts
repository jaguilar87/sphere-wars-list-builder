import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Char {
  key: string;
  name: string;
  title: string;
  domain?: number;
  cost: number;
  dependsOnLeader?: string;
}

export interface Unit {
  name: string;
  unique?: boolean;
  dependsOnLeader?: string;
  members: (Char & { min: number; max: number; selected: number })[];
  minCost: number;
  maxCost?: number;
}

export interface Veterancy {
  name: string;
  cost: number;
}

export interface Artifact {
  name: string;
  cost: number;
}

export interface Faction {
  name: string;
  key: string;
}
