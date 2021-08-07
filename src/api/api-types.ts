export type FeatureFlag = {
  id: number,
  name: string,
  description: string
}

export type FeatureRuleDefault = {
  type: 'DEFAULT',
  enabled: boolean,
}

export type FeatureRuleWhitelist = {
  type: 'WHITELIST',
  enabled: boolean,
  onList: string[]
  offList: string[]
}

export type FeatureRuleOnetime = {
  type: 'ONETIME',
  enabled: boolean,
  blocked: []
}

export type FeatureRuleWhitelistPayload = {
  enabled: boolean,
  onList: string[]
  offList: string[]
} 