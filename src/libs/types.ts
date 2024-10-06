export enum WordSources {
  pons = 'pons.com',
}

export interface LineValue {
  html: string;
  text: string;
}

export enum Envs {
  prod = 'prod',
  preprod = 'preprod',
  local = 'local',
}
