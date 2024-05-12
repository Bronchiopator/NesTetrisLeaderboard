export type ProofLabel =
  | 'Youtube'
  | 'Twitch'
  | 'CTM Discord'
  | 'Discord'
  | 'Google Drive'
  | 'Clipchamp'
  | '';

export enum ProofType {
  VideoPlus = 'Video+',
  Video = 'Video',
  PartialVideo = 'Partial Video',
  Image = 'Image',
  Claim = 'Claim',
  Lost = 'Lost',
}

export interface Proof {
  linkLable: ProofLabel;
  link?: string;
  proofType: ProofType;
}
