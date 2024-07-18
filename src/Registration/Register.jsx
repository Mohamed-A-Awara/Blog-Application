import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

// Import Styles
import '../Styles/Register.style.css'
import { LuFileSignature } from "react-icons/lu";

// Import File Of Project
import { notifyError, notifySuccess } from '../Components/Notify';
import Api from '../Config/api';
import { useNavigate } from 'react-router-dom';
import { successNotification } from '../Components/Notifications';

function Register() {
    const navigate = useNavigate()
    // Handle Form Data 
    const [loading , setLoading] = useState(false)
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",

    })
    // handle Form Changes
    const handleChange = (e) => {
        setInputData((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            console.log(inputData);
            // Check Match Password
            if (inputData.password !== inputData.confirmPass) {
                setLoading(false)
                return notifyError('Password Not Match')
            }
            delete inputData.confirmPass
            Api.post('/auth/signup', inputData)
            .then((res) => {
                console.log(res.data);
                // notifySuccess("Account Created !")
                successNotification("Account Created ! ❤️")
                navigate('/login')
                setLoading(false)

            })
            .catch((e)=>{
                const errMsg = e?.response?.data?.message || e?.response?.data?.error
                console.log(errMsg);
                notifyError(errMsg)
                setLoading(false)
            })
            // notifySuccess("Register Done")
        } catch (error) {
            notifyError(e.message)
        }
    }

    
    return (
        <section className='AllParent'>
            <div className="register">
                <div className="cardParent">
                    <Card>
                        <Card.Header
                            className='text-center headerStyle'
                        >
                            <LuFileSignature style={{ color: "green", fontSize: "40px" }} /> Register
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg='6' sm='12'>
                                        <Form.Group className="mb-3" controlId="firstname">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Mohamed"
                                                name='firstName'
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg='6' sm='12'>
                                        <Form.Group className="mb-3" controlId="lastname">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ayman"
                                                name='lastName'
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg='12' sm='12'>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="mohamedayman@gmail.com"
                                                name='email'
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col lg='12' sm='12'>
                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Complex Password"
                                                name='password'
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg='12' sm='12'>
                                        <Form.Group className="mb-3" controlId="Confirmpassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password Again"
                                                name='confirmPass'
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg='12' sm='12' className='d-flex justify-content-center p-2'>
                                        <Button 
                                            variant='success'
                                            className='w-50'
                                            type='submit'
                                            disabled={loading}
                                        >   
                                            Register
                                        </Button>
                                    </Col>

                                </Row>


                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Register