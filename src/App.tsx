import React, { useState } from 'react'

import { FeatureFlagMenu } from './featureflag-menu/featureflag-menu.component'
import { FeatureRule } from './featurerule/featurerule.component'

function App(){
  const [activeFlag, setActiveFlag] = React.useState<string | null>(null)

  return (
    <div>
      <FeatureFlagMenu setActiveFlag={setActiveFlag} />
      <FeatureRule activeFlag={activeFlag} />
    </div>
  )
}

export default App
