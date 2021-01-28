import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IGetBrandFromServer } from 'pages/Inventory/components/AddBrand/brand.types';
import { IGetCategoryFromServer } from 'typings/components/category.types';
import { IGetProductFromServer } from 'typings/components/product.types';
import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';
import { RootState } from '../store';

type TSliderAutofill =
    | IGetProductFromServer
    | IGetCategoryFromServer
    | IGetBrandFromServer
    | IGetTaxBracketFromServer;

export interface SliderModalInitialState {
    newSaleSlider: {
        show: boolean;
        autoFillData?: null;
    };
    addProductSlider: {
        show: boolean;
        autoFillData?: IGetProductFromServer;
    };
    addCategorySlider: {
        show: boolean;
        autoFillData?: IGetCategoryFromServer;
    };
    addBrandSlider: {
        show: boolean;
        autoFillData?: IGetBrandFromServer;
    };
    addTaxBracketSlider: {
        show: boolean;
        autoFillData?: IGetTaxBracketFromServer;
    };
    checkoutSlider: {
        show: boolean;
        autoFillData?: null;
    };
}

const initialState: SliderModalInitialState = {
    newSaleSlider: {
        show: false,
    },
    addProductSlider: {
        show: false,
    },
    addCategorySlider: {
        show: false,
    },
    addBrandSlider: {
        show: false,
    },
    addTaxBracketSlider: {
        show: false,
    },
    checkoutSlider: {
        show: false,
    },
};

const sliderModalSlice = createSlice({
    name: 'sliderModal',
    initialState,
    reducers: {
        toggleSliderModal: (
            state,
            {
                payload,
            }: PayloadAction<{
                sliderName: keyof SliderModalInitialState;
                active: boolean;
                autoFillData?: TSliderAutofill;
            }>,
        ) => {
            state[payload.sliderName].show = payload.active;
            state[payload.sliderName].autoFillData = payload.autoFillData;
        },
    },
});

// Exporting reducer
export default sliderModalSlice.reducer;

// Exporting actions
export const { toggleSliderModal } = sliderModalSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, SliderModalInitialState> = (
    state: RootState,
) => state.sliderModal;
