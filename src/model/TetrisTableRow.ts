import { InputMethod } from "./InputMethod";
import { Proof } from "./Proof";

export interface TetrisTableRow {
  ranking: number;
  name: number;
  crash: boolean;
  score: number;
  platform: 'Console' | 'Emulator';
  style: InputMethod[];
  proof: Proof;
  videoPersonalBest:number;
  notes:string;
  proofLablel:string;
  proofLink:string;
}