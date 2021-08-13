import React from 'react'

import classes from './App.module.css'
import { FeatureFlagMenu } from './featureflag-menu/featureflag-menu.component'
import { FeatureFlagComponent } from './featureflag/featureflag.component'

function App(){
  const [activeFlag, setActiveFlag] = React.useState<string>('')

  return (
    <div className={classes.container}>
      <FeatureFlagMenu setActiveFlag={setActiveFlag} />
      <FeatureFlagComponent activeFlag={activeFlag} />
    </div>
  )
}

export default App
