import { GamePlatform } from "./GamePlatform";
import { InputMethod } from "./InputMethod";
import { Proof } from "./Proof";

export interface TetrisTableRow {
  ranking: number;
  name: string;
  crash: boolean;
  score: number;
  platform:  GamePlatform;
  style: InputMethod[];
  proofType: Proof;
  videoPersonalBest:number;
  notes:string;
  proofLabel:string;
  proofLink:string;
}