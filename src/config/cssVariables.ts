export const cssColors = {
    /* section colors */
    '--sales-color': '#3f51b5',
    '--inventory-color': '#ff5722',
    '--cashregister-color': '#2196f3',

    /* mood colors */
    '--success-color': '#4caf50',
    '--success-accent-color': '#5dbf61',
    '--warning-color': '#ffc107',
    '--warning-accent-color': '#ffd218',
    '--danger-color': '#f44336',
    '--danger-accent-color': '#f55447',
    '--disabled-color': '#808080',

    /* element colors */
    '--border-color': '#f2f2f2',
    '--border-accent-color': '#e1e1e1',

    /* backgrounds */
    /* card" backgrounds */
    '--primary-background-color': '#ffffff',
    /* page background, selected" tab */
    '--secondary-background-color': '#f5f5f5',
    /* table header" background */
    '--tertiary-background-color': '#f6f6f6',

    /* font colors */
    '--primary-font-color': '#000000',
    '--secondary-font-color': '#808080',
    '--tertiary-font-color': '#a0a0a0',
    '--light-font-color': '#ffffff',
};

export type cssColorsType = typeof cssColors;

export const cssVariables = {
    /* font-sizes */
    '--font-size-extra-large': '40px',
    '--font-size-master': '26px',
    '--font-size-master-sub': '24px',
    '--font-size-header': '20px',
    '--font-size-small-heading': '18px',
    '--font-size-default': '16px',
    '--font-size-secondary': '14px',
    '--font-size-tertiary': '12px',

    /* values */
    '--border-radius': '0.2rem',
    '--rounded-border-radius': '50px',
    '--transition-duration': '0.3s',
    '--textfield-height': '40px',
};

// used to load css variables in ts object into the :root context
export function loadCSSValues(): void {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(cssVariables)) {
        root.style.setProperty(key, value);
    }
    for (const [key, value] of Object.entries(cssColors)) {
        root.style.setProperty(key, value);
    }
}
