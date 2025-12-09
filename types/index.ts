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
