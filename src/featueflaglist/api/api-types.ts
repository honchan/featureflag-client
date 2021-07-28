export type FeatureFlag = {
  id: number,
  name: string,
  description: string
}

export type FeatureRuleDefault = {
  type: string,
  enabled: boolean,
}

export type FeatureRuleWhitelist = {
  type: string,
  enabled: boolean,
  onList: string[]
  offList: string[]
}

export type FeatureRuleOnetime = {
  type: string,
  enabled: boolean,
  blocked: []
}