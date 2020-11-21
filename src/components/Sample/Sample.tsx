import React from 'react';
import styles from './sample.module.css';

export const Sample: React.FC = (): JSX.Element => {
    return (
        <div>
            <div className={styles.sampleWrapper}>Sample common component</div>
        </div>
    );
};