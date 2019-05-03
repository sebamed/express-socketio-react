import React from 'react';
import { Form, Button, Input, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import BasicField from '../../shared/form/input'
import { checkForm } from '../../../util/helpers'

class Login extends React.Component {

    handleSubmit = (values) => {
        this.props.goOnline(values.email)
        this.props.history.push({ pathname: '/chat-app', state: { email: values.email } });
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className="col-md-5 login-card">
                        <Card>
                            <div className="title">
                                <h1>Enter Your email</h1>
                            </div>
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
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Form.create({ name: 'login' })(Login));