import React from 'react';
import { Form, Button, Input, Card } from 'antd';
import BasicField from '../../shared/form/input'
import { checkForm } from '../../../util/helpers'
import io from 'socket.io-client';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: io('http://localhost:4000')
        }
    }

    handleSubmit = (values) => {
        console.log(values)
        this.state.socket.emit('connected', {field: 'test'});
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

export default Form.create({ name: 'login' })(Login);