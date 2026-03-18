import React from 'react';
import NumberSpinner from '../../components/NumberSpinner/NumberSpinner';
import { civilizationPillars } from '../../types/pillars';

import styles from './PillarsView.module.scss';

interface PillarsViewProps {
    pillars: Record<string, number>;
    setPillarCount: (pillar: string, count: number) => void;
}

const PillarsView: React.FC<PillarsViewProps> = ({ pillars, setPillarCount }) => {
    return (
        <div className={styles.wrapper}>
            {Object.entries(civilizationPillars).map(([key, pillar]) => (
                <div key={key} className={styles['pillar-counter']}>
                    <NumberSpinner
                        key={key}
                        label={pillar.label}
                        value={pillars[key]}
                        onValueChange={(value) => setPillarCount(key, value || 0)}
                        min={0}
                    />
                </div>
            ))}
        </div>
    );
};

export default PillarsView;