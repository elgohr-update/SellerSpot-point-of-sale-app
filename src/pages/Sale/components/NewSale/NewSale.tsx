import React, { useEffect, useState } from 'react';

import { Button } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import { Table } from '@sellerspot/universal-components';
import { generalUtilities } from 'utilities/utilities';
import { store } from 'store/store';
import styles from './newSale.module.scss';
import { toggleSliderModal } from 'store/models/sliderModal';
import { useHotkeys } from 'react-hotkeys-hook';

export const NewSale = (): JSX.Element => {
    // const [productsData, setproductsData] = useState<IGetProductFromServer[]>(null);
    // const [cartData, setCartData] = useState<ISaleCartItem[]>(null);

    useEffect(() => {
        // (async () => {
        //     const productsData = await getProducts();
        //     setproductsData(productsData.data as IGetProductFromServer[]);
        // }).call(null);
    }, []);

    useHotkeys(generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE, (event) => {
        event.preventDefault();
        store.dispatch(
            toggleSliderModal({
                sliderName: 'newSaleSlider',
                active: true,
            }),
        );
    });

    return (
        <div className={styles.newSaleWrapper}>
            <div className={styles.leftPanel}>
                <InputField placeHolder="Product Name / Code" onChange={(): void => void 0} />
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Item Name'}>{'Item Name'}</p>,
                        <p key={'Code'}>{'Code'}</p>,
                        <p key={'Brand'}>{'Brand'}</p>,
                        <p key={'Category'}>{'Category'}</p>,
                        <p key={'Available Stock'}>{'Available Stock'}</p>,
                        <p key={'Price'}>{'Price'}</p>,
                    ]}
                    // rowData={compileProductsTableBodyData(productsData)}
                    rowData={[]}
                />
                <div className={styles.extraControlsCard}>
                    <Button
                        type="button"
                        label="Return to Dashboard"
                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({ sliderName: 'newSaleSlider', active: false }),
                        //     )
                        // }
                    />
                    <Button label="Calculator" />
                </div>
            </div>
            <div className={styles.rightPanel}>
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Item Name'}>{'Item Name'}</p>,
                        <p key={'Quantity'}>{'Quantity'}</p>,
                        <p key={'Sub-Total'}>{'Sub-Total'}</p>,
                        <p key={'Discount'}>{'Discount'}</p>,
                    ]}
                    // rowData={getCartItems(cartData)}
                    rowData={[]}
                />
                <div className={styles.calculationCard}>
                    <div className={styles.calculationEntry}>
                        <span>{'Sub-Total'}</span>
                        <span>{'₹ 200.00'}</span>
                    </div>
                    <div className={styles.calculationEntry}>
                        <span>{'Add Taxes'}</span>
                        <span>{'₹ 50.00'}</span>
                    </div>
                    <div className={styles.calculationEntry}>
                        <span>{'Total Discount'}</span>
                        <span>{'- ₹ 20.00'}</span>
                    </div>
                    <div className={styles.calculationEntry}>
                        <span>{'Order Total'}</span>
                        <span className={styles.orderTotalText}>{'₹ 250.00'}</span>
                    </div>
                    <Button
                        label="CHECKOUT"
                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({ sliderName: 'checkoutSlider', active: true }),
                        //     )
                        // }
                    />
                </div>
            </div>
        </div>
    );
};
