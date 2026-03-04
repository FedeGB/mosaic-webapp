import { Routes, Route } from 'react-router'
import Header from './components/Header/Header'
import Influence from './containers/Influence/Influence'
import CivilizationPillars from './containers/CivilizationPillars/CivilizationPillars'
import VictoryPoints from './containers/VictoryPoints/VictoryPoints'

import './index.css'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Influence />} />
        <Route path="/influence" element={<Influence />} />
        <Route path="/civilization-pillars" element={<CivilizationPillars />} />
        <Route path="/victory-points" element={<VictoryPoints />} />
      </Routes>
    </div>
  )
}

export default App
