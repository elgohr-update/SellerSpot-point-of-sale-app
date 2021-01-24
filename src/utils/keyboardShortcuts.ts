/**
 * Holds all the keyboard shortcuts mapping used throught the application
 */
export const GLOBAL_KEYBOARD_SHORTCUTS = {
    NEW_SALE: 'F1',
    ADD_PRODUCT: 'ALT+P',
    ADD_CATEGORY: 'ALT+C',
    ADD_BRAND: 'ALT+B',
    ADD_TAXBRACKET: 'ALT+T',
};

/**
 * Combines all the global keyboard shortcuts to produce a single string to use in useHotkeys
 */
export const getGlobalKeyBoardShortcuts = (): string => {
    let globalShortcuts = '';
    for (const shortcut in GLOBAL_KEYBOARD_SHORTCUTS) {
        globalShortcuts += `${
            GLOBAL_KEYBOARD_SHORTCUTS[shortcut as keyof typeof GLOBAL_KEYBOARD_SHORTCUTS]
        },`;
    }
    return globalShortcuts;
};
