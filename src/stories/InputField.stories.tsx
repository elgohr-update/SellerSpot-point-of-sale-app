import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { InputField, IInputFieldProps } from '../components/InputField/InputField';
import { loadCSSValues } from '../config/cssVariables';
import { FcOk } from 'react-icons/fc';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: InputField,
} as Meta;

const Template: Story<IInputFieldProps> = (args: IInputFieldProps) => <InputField {...args} />;

export const InputFields = Template.bind({});
InputFields.args = {
    placeHolder: 'Sample Text Field',
    disabled: false,
    label: 'Sample Label',
    value: '55865',
    helperText: 'Sample Helper Text',
    type: 'text',
    size: 'default',
    prefix: <FcOk />,
    suffix: <p>pcs</p>,
    required: false,
    error: {
        errorMessage: 'Sample Error message',
        showError: true,
    },
    borderStyle: 'border',
    onChange: () => void 0,
} as IInputFieldProps;
