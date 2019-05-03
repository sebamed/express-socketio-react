import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import BasicField from '../../../shared/form/input';
import { checkForm } from '../../../../util/helpers';

const ChatInput = props => {

    const handleSubmit = values => {
        props.addMessage(values.chat);
        props.form.setFieldsValue({ chat: '' });
    }

    return (
        <Form onSubmit={(e) => checkForm(e, props.form, handleSubmit)}>
            <div className='chat-form'>
                <div className="chat-form-input">
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
                                placeholder='Your e-mail'
                                autoComplete={null}
                                autoFocus={true}
                            />
                        )}
                    />
                </div>
                <div className="chat-form-submit">
                <Button className='chat-form-button' type='primary' htmlType='submit'>Send <Icon type="right" /></Button>
                </div>
            </div>
        </Form>
    )

}

export default Form.create({ name: 'chat' })(ChatInput);