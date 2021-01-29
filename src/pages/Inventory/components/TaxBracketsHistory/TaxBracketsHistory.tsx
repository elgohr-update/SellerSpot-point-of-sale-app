import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { getTaxBrackets } from 'requests/taxBracket';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';
import { generalUtilities } from 'utilities/utilities';
// import {
//     compileTaxBracketsTableBodyData,
//     handleTaxBracketsHistoryTableRowClick,
// } from './taxBracketsHistory.actions';
import styles from './taxBracketsHistory.module.scss';

export const TaxBracketsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [
        taxBracketsData,
        setTaxBracketsData,
    ] = useState<pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBrackets>(null);

    useEffect(() => {
        // (async () => {
        //     // To populate the table
        //     const taxBracketsData = await getTaxBrackets();
        //     setTaxBracketsData(taxBracketsData.data as IGetTaxBracketFromServer[]);
        // }).call(null);
    }, []);

    return (
        <div className={styles.taxBracketWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addTaxBracket'}
                        label={`Add Tax-Bracket (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET})`}
                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({
                        //             sliderName: 'addTaxBracketSlider',
                        //             active: true,
                        //         }),
                        //     )
                        // }
                    />,
                ]}
            />
            {/* <div className={styles.tableWrapper}>
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'taxBracketName'}>{'Tax-Bracket Name'}</p>,
                        <p key={'taxBracketPercent'}>{'Tax-Bracket Percent'}</p>,
                    ]}
                    rowData={compileTaxBracketsTableBodyData(taxBracketsData)}
                    className={{
                        bodyRow: css`
                            :hover {
                                cursor: pointer;
                                background-color: ${cssColors['--secondary-background-color']};
                            }
                        `,
                    }}
                    onClick={{
                        rowClick: (index: number) => {
                            handleTaxBracketsHistoryTableRowClick(taxBracketsData[index]);
                        },
                    }}
                />
            </div> */}
        </div>
    );
};