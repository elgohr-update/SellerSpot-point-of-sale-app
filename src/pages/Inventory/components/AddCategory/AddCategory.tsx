import { Formik, useFormik } from 'formik';
import { ICallBackStateTrack } from 'layouts/Dashboard/components/Sliders/Sliders';
import { isNull, isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { brandRequests, categoryRequests } from 'requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { showMessage } from 'utilities/notify';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField } from '@sellerspot/universal-components';
import styles from './addCategory.module.scss';
import { AddCategoryFormSchema, IAddCategoryFormSchema } from './addCategory.types';

// holds the initial values for the form
const formInitialValues: IAddCategoryFormSchema = {
    name: '',
};

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface IAddCategoryProps {
    callBackStateTrack: [
        ICallBackStateTrack,
        React.Dispatch<React.SetStateAction<ICallBackStateTrack>>,
    ];
}
export const AddCategory = (props: IAddCategoryProps): JSX.Element => {
    //# VALUE HOOKS

    // getting sliderState to listen to when the slider is invoked
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // state to manage the focus state of the first inputField
    const [focusInputField, setFocusInputField] = useState(false);

    //# CRITICAL FUCNTIONS

    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addCategorySlider',
                active: false,
                autoFillData: null,
            }),
        );
        props.callBackStateTrack[1]({
            ...props.callBackStateTrack[0],
            addCategorySlider: false,
        });
    };

    // getting formik instance to handle form operations
    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: AddCategoryFormSchema,
        onSubmit: async (values: IAddCategoryFormSchema) => {
            formFormik.setSubmitting(true);
            const response = await categoryRequests.createCategory(values);
            if (response.status) {
                showMessage('Category added to database!', 'success');
                formFormik.resetForm();
                setFocusInputField(true);
            } else {
                response.error.map((error) => {
                    formFormik.setFieldError(error.name, error.message);
                });
            }
            formFormik.setSubmitting(false);
        },
    });

    //# HOOKS

    // * to manage focus for inputFields
    useEffect(() => {
        if (sliderState.addCategorySlider.show) {
            setFocusInputField(true);
            // checking if any autofill data is present
            if (!isNull(sliderState.addCategorySlider.autoFillData)) {
                const autoFillData = sliderState.addCategorySlider.autoFillData;
                // pushing data to formik state
                formFormik.setValues(autoFillData);
            }
        }
    }, [sliderState.addCategorySlider.show]);

    useEffect(() => {
        if (props.callBackStateTrack[0].addCategorySlider) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0].addCategorySlider]);

    // * Used to contol slider models visibility
    useHotkeys(
        generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_CATEGORY,
        (event) => {
            event.preventDefault();
            store.dispatch(
                toggleSliderModal({
                    sliderName: 'addCategorySlider',
                    active: true,
                    autoFillData: null,
                }),
            );
        },
        {
            enableOnTags: ['INPUT', 'SELECT', 'TEXTAREA'],
        },
    );

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageTitleBar}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        focus={focusInputField}
                        setFocus={setFocusInputField}
                        name={'name'}
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Eg.Drinks'}
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
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add Category'}
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
