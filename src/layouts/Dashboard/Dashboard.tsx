import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SliderModal } from '../../components/SliderModal/SliderModal';
import { ROUTES } from '../../config/routes';
import { AddProduct } from '../../pages/Inventory/components/Sliders/AddProduct/AddProduct';
import { CashRegister } from '../../pages/CashRegister/CashRegister';
import { Inventory } from '../../pages/Inventory/Inventory';
import { Sales } from '../../pages/Sales/Sales';
import { sliderModalSelector } from '../../store/models/sliderModal';
import { LeftNav } from './components/LeftNav/LeftNav';
import dashboardStyles from './dashboard.module.css';
import { Checkout } from '../../pages/Sales/components/Checkout/Checkout';
import { NewSale } from '../../pages/Sales/components/NewSale/NewSale';
import { BillingSetup } from '../../pages/BillingSetup/BillingSetup';
import { AddCategory } from '../../pages/Inventory/components/Sliders/AddCategory/AddCategory';

export const Dashboard = (): JSX.Element => {
    const { addProductSlider, addCategorySlider, checkoutSlider, newSaleSlider } = useSelector(sliderModalSelector);

    return (
        <div className={dashboardStyles.dashboardWrapper}>
            <div className={dashboardStyles.leftNavWrapper}>
                <LeftNav />
            </div>
            <div className={dashboardStyles.mainBodyWrapper}>
                <Switch>
                    <Route path={ROUTES.INVENTORY}>
                        <Inventory />
                    </Route>
                    <Route path={ROUTES.CASH_REGISTER}>
                        <CashRegister />
                    </Route>
                    <Route path={ROUTES.BILLING_SETUP}>
                        <BillingSetup />
                    </Route>
                    {/* this is '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES}>
                        <Sales />
                    </Route>
                </Switch>
            </div>
            {/* full view sliders should be placed down here */}
            <SliderModal active={addProductSlider} sliderSize={'40%'}>
                <AddProduct />
            </SliderModal>
            <SliderModal active={addCategorySlider} sliderSize={'40%'}>
                <AddCategory />
            </SliderModal>
            <SliderModal active={newSaleSlider} sliderSize={'100%'}>
                <NewSale />
            </SliderModal>
            <SliderModal active={checkoutSlider} sliderSize={'80%'}>
                <Checkout />
            </SliderModal>
        </div>
    );
};
