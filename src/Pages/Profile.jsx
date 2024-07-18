import { useEffect, useRef, useState } from 'react'


// Import Styles and Images
import '../Styles/profile.style.css'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import defaultImg from '../assets/Images/defaultProfile.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../Redux/Reducers/user'
import Api from '../Config/api'
// import { notifySuccess } from '../Components/Notify'
import domain from '../Config/domain'
import { successNotification } from '../Components/Notifications'
import { Link } from 'react-router-dom'
// import domain from '../Config/domain'

function Profile() {
    const imageButton = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.data)
    // console.log(user);

    const handleShowUpload = () => {
        imageButton.current.click();
    }

    const [updateData, setUpdateData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        phone: "",
        image: "",
    })

    const handleChange = (e) => {
        setUpdateData((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }


    //Separete Two Images  
    const [image, setImage] = useState(null)
    const fileUploadChange = (e) => {
        // console.log(e.target.files);
        let file = e.target.files[0]
        setImage(file)

    }

    

    const handleSubmit = (e) => {
        e.preventDefault()

        Api.patch('/user', {
            ...updateData,
            image: image || updateData?.image
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                successNotification("User Profile Updated !")
                dispatch(fetchUserData())
            }).catch((error) => {
                const errMsg =
                    error?.response?.data?.message || error?.response?.data?.error;
                console.log(errMsg);
            })
    }

    useEffect(() => {
        // e.preventDefault()
        dispatch(fetchUserData())
        setUpdateData(user.message)
    }, [])

    console.log(domain+updateData?.image);
    // Design 
    return (
        <>
            <section className='AllParent profileStyle'>
                <div className="profileParent">
                    <Card className='profileCard'>
                        <Card.Header className='p-4 headerTitle'> Profile </Card.Header>
                        <Card.Body className='profileBody'>
                            <Form onSubmit={handleSubmit}>
                                <div className="profileImg">
                                    <img src={(image && URL.createObjectURL(image)) || domain + updateData?.image || defaultImg} alt="img" />
                                    <div className="imguplaod">
                                        <input
                                            type="file"
                                            name="image"
                                            ref={imageButton}
                                            onChange={fileUploadChange}
                                            style={{ display: "none" }}
                                        />
                                        <Button
                                            variant='secondary'
                                            onClick={handleShowUpload}
                                        >
                                            Change Image
                                        </Button>
                                    </div>
                                </div>

                                <div className="profileData mt-4">
                                    <Container >
                                        <Row>
                                            <Col lg='6' md='12'>
                                                <Form.Group className="mb-3" controlId="content">
                                                    <Form.Label className='profileLabel'>First Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=""
                                                        name='firstName'
                                                        value={updateData?.firstName}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col lg='6' md='12'>
                                                <Form.Group className="mb-3" controlId="content">
                                                    <Form.Label className='profileLabel'>Last Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=""
                                                        name='lastName'
                                                        value={updateData?.lastName}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col lg='12' md='12'>
                                                <Form.Group className="mb-3" controlId="content">
                                                    <Form.Label className='profileLabel'>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=""
                                                        name='email'
                                                        disabled
                                                        value={updateData?.email}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col lg='6' md='12'>
                                                <Form.Group className="mb-3" controlId="content">
                                                    <Form.Label className='profileLabel'>Age</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=""
                                                        name='age'
                                                        value={updateData?.age}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg='6' md='12'>
                                                <Form.Group className="mb-3" controlId="content">
                                                    <Form.Label className='profileLabel'>Phone</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder=""
                                                        name='phone'
                                                        value={updateData?.phone}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg='8' md='12' className='m-auto mt-4 mb-4'>
                                                <Button
                                                    variant='success'
                                                    className='p-2 w-100'
                                                    type='submit'
                                                >
                                                    Update
                                                </Button>
                                            </Col>
                                            <p className='text-center passwordChange'>You Need To Change Your Password ? 

                                                <Link to='/password'> Click Here</Link>
                                            </p>
                                        </Row>
                                    </Container>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </>
    )
}

export default Profile