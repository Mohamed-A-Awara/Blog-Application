import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

// Import Styles
import '../Styles/Register.style.css'
import { RiLockPasswordFill } from "react-icons/ri";

// Import File Of Project
import { notifyError, notifySuccess } from '../Components/Notify';
import Api from '../Config/api';
import { Link, useNavigate, } from 'react-router-dom';
import { fetchUserData } from '../Redux/Reducers/user';
import { useDispatch } from 'react-redux';
import { successNotification } from '../Components/Notifications';
function ChangePassword() {


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
            oldPassword: "",
            newPassword: "",
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
    
                Api.post('/user/update/password', inputData)
                    .then((res) => {
                        console.log(res.data);
                        // notifySuccess("Login Successfully !")
                        successNotification("Password Changed successfully ! ❤️❤️")
                        setLoading(false)
                        navigate('/profile')
    
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
                        <RiLockPasswordFill style={{ color: "green", fontSize: "40px" }} /> Change Password
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>

                                <Col lg='12' sm='12'>
                                    <Form.Group className="mb-3" controlId="oldPassword">
                                        <Form.Label>Old Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Old Password"
                                            name='oldPassword'
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
                                            placeholder="Enter New Complex Password"
                                            name='newPassword'
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
                                        Update Password
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

export default ChangePassword