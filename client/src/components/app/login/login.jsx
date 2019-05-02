import React from 'react';
import { Form, Button, Input } from 'antd';
import BasicField from '../../shared/form/input'
import { checkForm } from '../../../util/helpers'

class Login extends React.Component {

    handleSubmit = (values) => {
        console.log(values)
    }

    render() {
        return (
            <Form onSubmit={(e) => checkForm(e, this.props.form, this.handleSubmit)}>
                <BasicField
                    name='email'
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!'
                        },
                        {
                            type: 'email',
                            message: 'Field must be an email!'
                        }
                    ]}
                    form={this.props.form}
                    Component={(
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Your e-mail'
                            className="input-text with-border"
                            autoComplete='email'
                            autoFocus={true}
                        />
                    )}
                />
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Login</Button>
                </Form.Item>
            </Form>
        )
    }

}

export default Form.create({ name: 'login' })(Login);