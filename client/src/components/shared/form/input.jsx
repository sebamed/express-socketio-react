import React from 'react';
import { Form } from 'antd';

const BasicField = props => {

    const { name, label, rules, Component, form, hasFeedback, value } = props;
    const { getFieldDecorator } = form;

    return (
        <Form.Item hasFeedback={hasFeedback ? true : false} label={label ? label : ''}>
            {getFieldDecorator(name, {
                rules: rules,
                initialValue: value
            })(Component)}
        </Form.Item>
    )
}

export default BasicField;