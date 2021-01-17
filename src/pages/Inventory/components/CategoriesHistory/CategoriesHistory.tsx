// import { cssColors } from 'config/cssVariables';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Button } from '@sellerspot/universal-components';
// import { MetaCard } from 'components/MetaCard/MetaCard';
// import { Table } from '@sellerspot/universal-components';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import lodash from 'lodash';
// import { css } from '@emotion/css';
// import { IGetProductFromServer } from 'typings/components/product.types';
// import { getCategoriesHistoryStyles } from './categoriesHistory.styles';
// import { getProducts } from 'requests/product';
// import { compileProductsTableBodyData, handleTableRowClick } from './categoriesHistory.actions';
// import { showNotify } from 'store/models/notify';
// import { store } from 'store/store';

// export const ProductsHistory = (): JSX.Element => {
//     // To manage which tab is selected
//     const dispatch = useDispatch();
//     const styles = getCategoriesHistoryStyles();
//     const [productsData, setproductsData] = useState<IGetProductFromServer[]>(null);

//     useEffect(() => {
//         (async () => {
//             // To populate the table
//             const productsData = await getProducts();
//             setproductsData(productsData.data as IGetProductFromServer[]);
//         }).call(null);
//     }, []);

//     return (
//         <div className={styles.categoriesWrapper}>
//             <MetaCard
//                 title="Sample Description"
//                 secondaryText={'Sample Data'}
//                 buttons={[
//                     <Button
//                         key={'addProduct'}
//                         label="Add Category (F4)"
//                         style={{
//                             color: cssColors['--inventory-color'],
//                             backgroundColor: cssColors['--primary-background-color'],
//                             borderColor: cssColors['--inventory-color'],
//                         }}
//                         onClick={() =>
//                             dispatch(
//                                 toggleSliderModal({ sliderName: 'addProductSlider', active: true }),
//                             )
//                         }
//                     />,
//                 ]}
//             />
//             <div className={styles.tableWrapper}>
//                 <Table
//                     headers={[
//                         <p key={'S.No'}>{'S.No'}</p>,
//                         <p key={'Brand Name'}>{'Brand Name'}</p>,
//                     ]}
//                     rowData={compileProductsTableBodyData(productsData)}
//                     className={{
//                         bodyRow: css`
//                             :hover {
//                                 cursor: pointer;
//                                 background-color: ${cssColors['--secondary-background-color']};
//                             }
//                         `,
//                     }}
//                     onClick={{
//                         rowClick: (index: number) => {
//                             handleTableRowClick(productsData[index]);
//                         },
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };