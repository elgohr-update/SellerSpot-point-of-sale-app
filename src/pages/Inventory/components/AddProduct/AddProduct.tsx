import classNames from 'classnames';
import { useFormik } from 'formik';
import { isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { generalUtilities } from 'utilities/utilities';
import {
    Button,
    Checkbox,
    Dropdown,
    HorizontalRule,
    InputField,
} from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { compileProductMetaDataOptions } from './addProduct.actions';
import styles from './addProduct.module.scss';
import {
    AddProductFormSchema,
    IAddProductFormSchema,
    IProductMetaDataOptions,
} from './addProduct.types';

/**
 * * holds the initial values for the form
 */
const formInitialValues: IAddProductFormSchema = {
    name: '',
    gtinNumber: '',
    category: null,
    brand: null,
    landingPrice: 0,
    profitPercent: 0,
    sellingPrice: 0,
    mrpPrice: 0,
    availableStock: 0,
    stockUnit: null,
    taxBracket: [],
};

/**
 * * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface IAddProductProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const AddProduct = (props: IAddProductProps): JSX.Element => {
    // holds the available metadata for a product
    const [productMetaDataOptions, setProductMetaDataOptions] = useState<IProductMetaDataOptions>({
        brands: [],
        categories: [],
        stockUnits: [],
        taxBrackets: [],
    });

    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addProductSlider',
                active: false,
            }),
        );
        props.callBackStateTrack[1](false);
    };

    // to fetch all available metadata for a product
    useEffect(() => {
        (async () => {
            setProductMetaDataOptions(await compileProductMetaDataOptions());
        }).call(null);
    }, []);

    // to handle slider closing operations
    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0]]);

    useHotkeys(generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_PRODUCT, () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addProductSlider',
                active: true,
            }),
        );
    });

    // getting sliderState to listen to when the slider is invoked to autopopulate if needed
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // getting formik instance to handle form operations
    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: AddProductFormSchema,
        onSubmit: (values: IAddProductFormSchema) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageTitleBar}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        name={'name' as pointOfSaleTypes.productResponseTypes.fieldNames}
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Eg. Wanda Paprika'}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.name ?? '',
                            showError:
                                !isUndefined(formFormik.errors.name) && formFormik.touched.name,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.name}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputField
                        name={'gtinNumber' as pointOfSaleTypes.productResponseTypes.fieldNames}
                        type={'text'}
                        label={'GTIN Number'}
                        helperText={'Refers to the barcode for the product'}
                        placeHolder={'Eg. 0123456789'}
                        error={{
                            errorMessage: formFormik.errors.gtinNumber ?? '',
                            showError:
                                !isUndefined(formFormik.errors.gtinNumber) &&
                                formFormik.touched.gtinNumber,
                        }}
                        value={formFormik.values.gtinNumber}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Category'}
                        options={productMetaDataOptions.categories.map((category, index) => {
                            return <p key={index}>{category.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'category',
                                productMetaDataOptions.categories[index],
                            );
                        }}
                    />
                    <Dropdown
                        label={'Product'}
                        options={productMetaDataOptions.brands.map((brand, index) => {
                            return <p key={index}>{brand.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue('brand', productMetaDataOptions.brands[index]);
                        }}
                    />
                </div>
                <HorizontalRule
                    ruleWidth={'75%'}
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingTop: 5,
                            paddingBottom: 20,
                        },
                    }}
                />
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        name={'landingPrice'}
                        type={'number'}
                        label={'Landing Price'}
                        placeHolder={'Landing Price'}
                        prefix={<p>₹</p>}
                        required={true}
                        value={formFormik.values.landingPrice?.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                        error={{
                            errorMessage: formFormik.errors.landingPrice ?? '',
                            showError:
                                !isUndefined(formFormik.errors.landingPrice) &&
                                formFormik.touched.landingPrice,
                        }}
                    />
                    <InputField
                        name={'profitPercent'}
                        type={'number'}
                        label={'Profit Percent'}
                        placeHolder={'Profit Percent'}
                        suffix={<p>%</p>}
                        value={formFormik.values.profitPercent?.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                        error={{
                            errorMessage: formFormik.errors.profitPercent ?? '',
                            showError:
                                !isUndefined(formFormik.errors.profitPercent) &&
                                formFormik.touched.profitPercent,
                        }}
                    />
                </div>
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        name={'mrpPrice'}
                        type={'number'}
                        label={'MRP'}
                        prefix={<p>₹</p>}
                        placeHolder={'Eg. 251'}
                        error={{
                            errorMessage: formFormik.errors.mrpPrice ?? '',
                            showError:
                                !isUndefined(formFormik.errors.mrpPrice) &&
                                formFormik.touched.mrpPrice,
                        }}
                        value={formFormik.values.mrpPrice.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                    <InputField
                        name={'sellingPrice'}
                        type={'number'}
                        label={'Selling Price'}
                        prefix={<p>₹</p>}
                        placeHolder={'Eg. 251'}
                        error={{
                            errorMessage: formFormik.errors.sellingPrice ?? '',
                            showError:
                                !isUndefined(formFormik.errors.sellingPrice) &&
                                formFormik.touched.sellingPrice,
                        }}
                        value={formFormik.values.sellingPrice.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <HorizontalRule
                    ruleWidth={'75%'}
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingTop: 5,
                            paddingBottom: 20,
                        },
                    }}
                />
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Available Stock'}
                        placeHolder={'Available Stock'}
                        value={formFormik.values.availableStock?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue('availableStock', event.target.value)
                        }
                        error={{
                            errorMessage: formFormik.errors.sellingPrice ?? '',
                            showError:
                                !isUndefined(formFormik.errors.sellingPrice) &&
                                formFormik.touched.sellingPrice,
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={productMetaDataOptions.stockUnits.map((stockUnit) => {
                            return <p key={stockUnit._id}>{stockUnit.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'stockUnit',
                                productMetaDataOptions.stockUnits[index],
                            );
                        }}
                    />
                </div>
                <div className={classNames(styles.formGroup)}>
                    {productMetaDataOptions.taxBrackets?.map((taxBracket, index) => {
                        return (
                            <Checkbox
                                key={index}
                                groupLabel={index === 0 ? 'Tax Bracket' : null}
                                label={taxBracket.name}
                                checked={false}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        const taxBracketValues = formFormik.values.taxBracket;
                                        taxBracketValues.push(taxBracket);
                                        formFormik.setFieldValue('taxBracket', taxBracketValues);
                                    } else {
                                        const taxBracketValues = formFormik.values.taxBracket;
                                        // finding index of the taxBracket to remove and removing it
                                        for (let i = 0; i < taxBracketValues.length; i++) {
                                            if (taxBracketValues[i]._id === taxBracket._id) {
                                                taxBracketValues.splice(i, 1);
                                                formFormik.setFieldValue(
                                                    'taxBracket',
                                                    taxBracketValues,
                                                );

                                                break;
                                            }
                                        }
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add Product'}
                    tabIndex={0}
                />
                <Button
                    type="button"
                    status={formFormik.isSubmitting ? 'disabled' : 'default'}
                    label="Reset Values"
                    onClick={() => {
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};