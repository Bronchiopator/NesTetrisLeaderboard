import { GamePlatform } from './GamePlatform';
import { InputMethod } from './InputMethod';
import { Proof, ProofType } from './Proof';

export interface TetrisTableRow {
  ranking: number;
  name: string;
  crash: boolean;
  score: number;
  platform: GamePlatform;
  playStyle: InputMethod[];
  proof: Proof;
  // double declaraton of prooftype is not necessary, but it enables
  // sorting on table without implementing a custom sorter. So double declaration it is.
  proofType: ProofType;
  videoPersonalBest: number;
  notes: string;
}
