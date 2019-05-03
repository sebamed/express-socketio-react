import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import BasicField from '../../../shared/form/input';
import { checkForm } from '../../../../util/helpers';

const ChatInput = props => {

    const handleSubmit = values => {
        props.addMessage(values.chat);
        props.form.setFieldsValue({chat: ''});
    }

    return (
        <Form style={{ position: 'relative' }} onSubmit={(e) => checkForm(e, props.form, handleSubmit)}>
            <div className='chat-form'>
                <BasicField
                    name='chat'
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please write a message!'
                        }
                    ]}
                    form={props.form}
                    Component={(
                        <Input.TextArea
                            id='chat'
                            type='text'
                            name='chat'
                            rows='3'
                            maxLength='150'
                            className='chat-form-input'
                            placeholder='Your e-mail'
                            autoComplete={null}
                            autoFocus={true}
                        />
                    )}
                />
                <Button className='chat-form-button' type='primary' htmlType='submit'>Send <Icon type="right" /></Button>
            </div>
        </Form>
    )

}

export default Form.create({ name: 'chat' })(ChatInput);