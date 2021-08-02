import React from 'react'

import classes from './App.module.css'
import { FeatureFlagMenu } from './featureflag-menu/featureflag-menu.component'
import { FeatureRule } from './featurerule/featurerule.component'

function App(){
  const [activeFlag, setActiveFlag] = React.useState<string | null>(null)

  return (
    <div className={classes.container}>
      <FeatureFlagMenu setActiveFlag={setActiveFlag} />
      <FeatureRule activeFlag={activeFlag} />
    </div>
  )
}

export default App
