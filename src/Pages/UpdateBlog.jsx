import { useState, useRef, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

// Import Styles and Images
import '../Styles/CreateBlog.style.css'
import { notifySuccess } from '../Components/Notify'
import defaultImage from '../assets/Images/defaultImg.png'
import Api from '../Config/api'
import { fetchUserBlogs } from '../Redux/Reducers/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import domain from '../Config/domain'





function UpdateBlog() {
    // Get Id from url 
    const { id } = useParams()
    // console.log(id);
    const imageData = useRef()
    const dispatch = useDispatch()

    //Separete Two Images  
    const [image, setImage] = useState(null)
    const fileUploadChange = (e) => {
        // console.log(e.target.files);
        let file = e.target.files[0]
        setImage(file)

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


    const blogs = useSelector((state) => state.blogs.data)
    // console.log(blogs);
    // Find USer Blog
    const userBlog = blogs.find((item) => item._id === id)
    // console.log(userBlog);



    useEffect(() => {
        dispatch(fetchUserBlogs())
        setFormData(userBlog)
    }, [id])




    const handleSubmit = async (e) => {
        e.preventDefault()
        Api.patch('/blog' , {
            ...formData , 
            image : image || formData.image
        } , {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        .then(()=>{
            notifySuccess("Blog Updated !")
        })
    }
    console.log(domain + formData.image);


    return (
        <section className='AllParent'>
            <div className="blogParent">
                <div className="blog">
                    <Card>
                        <Card.Header
                            className='text-center p-3 headerStyle'
                        >
                            Update Your Blog
                        </Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg='12' className='blogCol ColImg'>
                                    <div className="UploadImgBox">
                                        <img src={(image && URL.createObjectURL(image)) || domain + formData.image || defaultImage} alt="" />
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
                                            Update
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

export default UpdateBlog
