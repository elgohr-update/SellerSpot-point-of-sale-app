import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { productRequests } from 'requests/requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { compileProductsTableBodyData, handleCloseSlider } from './newSale.action';
import styles from './newSale.module.scss';

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface INewSaleProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const NewSale = (props: INewSaleProps): JSX.Element => {
    const [searchResults, setSearchResults] = useState<
        pointOfSaleTypes.productResponseTypes.ISearchProduct['data']
    >(null);
    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    };
    const [searchQuery, setSearchQuery] = useState('');
    // const [cartData, setCartData] = useState<ISaleCartItem[]>(null);`

    // used to query the server to fetch product suggestions
    const queryServer = useCallback(
        debounce(async (query: string) => {
            if (query.length > 0) {
                setSearchResults(await productRequests.searchProduct(query));
            }
        }, 400),
        [],
    );

    /**
     * Used to handle the user typing in the New Sale page
     * @param query Query typed by the user in the search bar
     */
    const handleProductNameSearch = async (query: string): Promise<void> => {
        setSearchQuery(query);
        // const searchedProducts = await productRequests.searchProduct(query);
        queryServer(query);
        // console.log(searchedProducts);
    };

    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider(props.callBackStateTrack[1]);
        }
    }, [props.callBackStateTrack[0]]);

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
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
                <InputField
                    placeHolder="Product Name / Code"
                    value={searchQuery}
                    onChange={(event) => handleProductNameSearch(event.target.value)}
                />
                <div className={cn('ag-theme-alpine')}>
                    <AgGridReact
                        columnDefs={[
                            {
                                headerName: 'Status',
                                field: 'status',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Created At',
                                field: 'createdAt',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Sub-Total',
                                field: 'taxation',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Taxation',
                                field: 'status',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Grand Total',
                                field: 'grandTotal',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                        ]}
                    />
                </div>
                <div className={styles.extraControlsCard}>
                    <Button
                        type="button"
                        label="Return to Dashboard"
                        onClick={() =>
                            store.dispatch(
                                toggleSliderModal({ sliderName: 'newSaleSlider', active: false }),
                            )
                        }
                    />
                    <Button label="Calculator" />
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={'ag-theme-alpine'}>
                    <AgGridReact
                        columnDefs={[
                            {
                                headerName: 'Item Name',
                                field: 'itemName',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Quantity',
                                field: 'quantity',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Sub-Total',
                                field: 'subtotal',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Discount',
                                field: 'discount',
                                sortable: true,
                                filter: true,
                                resizable: true,
                                flex: 1,
                            },
                        ]}
                    />
                </div>
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
                        //     store.dispatch(
                        //         toggleSliderModal({ sliderName: 'checkoutSlider', active: true }),
                        //     )
                        // }
                    />
                </div>
            </div>
        </div>
    );
};
