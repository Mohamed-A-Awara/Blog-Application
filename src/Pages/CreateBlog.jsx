import { useState, useRef } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

// Import Styles and Images
import '../Styles/CreateBlog.style.css'
import { notifyError, notifySuccess } from '../Components/Notify'
import defaultImage from '../assets/Images/defaultImg.png'
import Api from '../Config/api'
import { fetchUserBlogs } from '../Redux/Reducers/blogs'
import { useDispatch } from 'react-redux'





function CreateBlog() {
    const imageData = useRef()
    const dispatch = useDispatch()
    const fileUploadChange = (e) => {
        // console.log(e.target.files);
        let file = e.target.files[0]
        setFormData({
            ...formData,
            image: file
        })

    }
    const handleUpload = () => {
        imageData.current.click()
    }
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: ""
    })

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log(formData);
            Api.post('/blog', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response) => {
                    console.log(response);
                    notifySuccess('Blog Created ! ')
                    dispatch(fetchUserBlogs())
                    setFormData({
                        title: "",
                        content: "",
                        image: ""
                    })
                }).catch((e) => {
                    // console.log(error)
                    const errMsg = e?.response?.data?.message || e?.response?.data?.error
                    console.log(errMsg);
                    notifyError("Not Created")
                })
        } catch (error) {
            notifyError(error.message)
        }
    }



    return (
        <section className='AllParent'>
            <div className="blogParent">
                <div className="blog">
                    <Card>
                        <Card.Header
                            className='text-center p-3 headerStyle'
                        >
                            Create New Blog
                        </Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg='12' className='blogCol ColImg'>
                                    <div className="UploadImgBox">
                                        <img src={(formData.image && URL.createObjectURL(formData.image)) || defaultImage} alt="" />
                                    </div>
                                </Col>
                                <Col lg='10' className='blogCol'>
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Blog Title "
                                            value={formData.title}
                                            name='title'
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg='10' className='blogCol'>
                                    <Form.Group className="mb-3" controlId="content">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Blog Content "
                                            value={formData.content}
                                            name='content'
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg='10' className='blogCol'>
                                    <Form.Group className="mb-3" controlId="content">
                                        <Form.Label>Image </Form.Label>
                                        <Form.Control
                                            type="file"
                                            name='image'
                                            ref={imageData}
                                            onChange={fileUploadChange}
                                            required
                                            style={{ display: 'none' }}
                                        />
                                        <Button
                                            variant='info'
                                            className='w-50 d-block btnUpload'
                                            onClick={handleUpload}
                                        > Upload Image </Button>
                                    </Form.Group>
                                </Col>

                                <Col lg='12' className='blogCol'>
                                    <Card.Footer style={{ textAlign: "center" }}>
                                        <Button
                                            type='submit'
                                            variant='success'
                                            className='btnCreate'
                                        >
                                            Create Blog
                                        </Button>
                                    </Card.Footer>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default CreateBlog