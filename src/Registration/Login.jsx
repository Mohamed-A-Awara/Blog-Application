import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

// Import Styles
import '../Styles/Register.style.css'
import { LuFileSignature } from "react-icons/lu";

// Import File Of Project
import { notifyError, notifySuccess } from '../Components/Notify';
import Api from '../Config/api';
import { Link, useNavigate, } from 'react-router-dom';
import { fetchUserData } from '../Redux/Reducers/user';
import { useDispatch } from 'react-redux';
import { successNotification } from '../Components/Notifications';

function Login() {
    // Handle Form Data 
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    // To Check user 
    // const user = useSelector((state)=> state.user.data)
    // const user = useSelector((state)=> state.user.isLogin)
    // console.log(user);
    useEffect(() => {
        dispatch(fetchUserData())
    }, [])
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
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

            Api.post('/auth/login', inputData)
                .then((res) => {
                    console.log(res.data);
                    // notifySuccess("Login Successfully !")
                    successNotification("Login successfully ! ❤️❤️")
                    setLoading(false)
                    navigate('/home')

                    dispatch(fetchUserData())
                })
                .catch((e) => {
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
                            <LuFileSignature style={{ color: "green", fontSize: "40px" }} /> Login
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>

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

                                    <Col lg='12' sm='12' className='d-flex justify-content-center p-2'>
                                        <Button
                                            variant='success'
                                            className='w-50'
                                            type='submit'
                                            disabled={loading}
                                        >
                                            Login
                                        </Button>
                                    </Col>
                                    <Col lg='12' sm='12' className='d-flex justify-content-center p-2'>
                                        <p className='w-50 text-center'>
                                            Do not have account ? <Link to='/register'> Register Now !</Link>
                                        </p>
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

export default Login