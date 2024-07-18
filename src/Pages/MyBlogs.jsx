import { useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

// Import Styles amd Imgs
import '../Styles/MyBlogs.style.css'
import defaultImage from '../assets/Images/defaultImg.png'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Import Files Of Backend
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBlogs } from '../Redux/Reducers/blogs';
import domain from '../Config/domain';
import Api from '../Config/api';
import { notifyError, notifySuccess } from '../Components/Notify';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { fetchUserData } from '../Redux/Reducers/user';


function MyBlogs() {

    const dispatch = useDispatch()
    const userBlogs = useSelector((state) => state.blogs.data)
    const userData = useSelector((state) => state.user.data)
    const navigate = useNavigate()
    // console.log(userData.message.email);
    useEffect(() => {
        dispatch(fetchUserBlogs())
        dispatch(fetchUserData())
        // domain
    }, [])

    const handleEditBlog = (id) => {
        navigate(`/blogDetails/${id}`)
    }
    const handleDeleteBlog = async (id) => {
        await Api.delete(`/blog/${id}`)
            .then(() => {
                notifySuccess('Blog Deleted !')
                dispatch(fetchUserBlogs())
            }).catch((error) => {
                const errMsg =
                    error?.response?.data?.message || error?.response?.data?.error;
                console.log(errMsg);
                notifyError(errMsg)
            })
    }
    // User data of Blog
    

    // Design
    return (
        <section className='AllParent'>
            <div className="userBlogs">
                <div className="usercontent">
                    <Row>
                        {
                            userBlogs && userBlogs.length ? (
                                userBlogs.map((blog) => (
                                    <>
                                        <Col lg='3' md='6' sm='10' className='mb-3'>
                                            <Card className='w-100' id={blog._id} >
                                                <Card.Header className='p-3' style={{textTransform : "capitalize" , fontSize : "1.2rem" , fontWeight :"600"}}>
                                                    <FaUserCircle  style={{fontSize : "1.8rem" , marginRight : "10px"}}/>
                                                    {userData.message.firstName + " " +  userData.message.lastName}
                                                </Card.Header>
                                                <Card.Img src={domain + blog.image || defaultImage} className='userBlogImage' />
                                                <Card.Body className='text-center'>
                                                    <Card.Title>{blog.title}</Card.Title>
                                                    <Card.Text>
                                                        {blog.content}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer className='w-100 text-center'>
                                                    <Button
                                                        variant='info'
                                                        className='me-5'
                                                        onClick={() => handleEditBlog(blog._id)}
                                                    >
                                                        <FaRegEdit /> Update
                                                    </Button>
                                                    <Button
                                                        variant='danger'
                                                        onClick={() => handleDeleteBlog(blog._id)}
                                                    >
                                                        <MdDelete /> Delete
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    </>
                                ))
                            ) : (
                                <>
                                    <div className='text-center p-5'>
                                        <h1 className='text-white'>No Blogs Created ! </h1>
                                        <Button variant='info' className='mt-3 p-3'  onClick={()=>{
                                            navigate('/create-blog')
                                        }}>Create Blog ! </Button>
                                    </div>
                                
                                </>
                            )
                        }
                    </Row>
                </div>
            </div>
        </section>
    )
}

export default MyBlogs