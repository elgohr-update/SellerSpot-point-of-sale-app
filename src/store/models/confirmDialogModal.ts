import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IConfirmDialogProps } from '../../components/ConfirmDialog/ConfirmDialog';
import { RootState } from '../store';

const initialState: IConfirmDialogProps = {
    active: false,
    title: 'This is sample confirm dialog header?',
    successActionLabel: 'Agree',
    failureActionLabel: 'Disagree',
    description:
        'This is sample confirm dialog description. This is sample confirm dialog description. This is sample confirm dialog description.',
    onFailure: () => void 0,
    onSuccess: () => void 0,
};

const confirmModalSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        openConfirmDialog: (state, { payload }: PayloadAction<Omit<IConfirmDialogProps, 'active'>>) => {
            // state.active = payload.active;
            Object.assign(state, { ...payload, active: true });
        },
        closeConfirmDialog: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// exporting reducer
export default confirmModalSlice.reducer;

// exporting actions
export const { openConfirmDialog, closeConfirmDialog } = confirmModalSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const confirmDialogSelector: Selector<RootState, IConfirmDialogProps> = (state: RootState) =>
    state.confirmDialogModal;
