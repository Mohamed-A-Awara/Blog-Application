import { useEffect } from 'react'
import {  Card, Col, Row } from 'react-bootstrap'

// Import Styles amd Imgs
import '../Styles/MyBlogs.style.css'
import defaultImage from '../assets/Images/defaultImg.png'

// Import Files Of Backend
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminBlogs } from '../Redux/Reducers/blogs';
import domain from '../Config/domain';
import { FaUserCircle } from "react-icons/fa";
import {  } from '../Redux/Reducers/user';


function BLogs() {

    const dispatch = useDispatch()
    const userBlogs = useSelector((state) => state.blogs.allData)
    // const userData = useSelector((state) => state.user.data)
    // const navigate = useNavigate()
    console.log(userBlogs);
    useEffect(() => {
        dispatch(fetchAdminBlogs())
    }, [])
    

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
                                                    {blog.owner?.firstName + " " +  blog.owner?.lastName}
                                                </Card.Header>
                                                <Card.Img src={domain + blog.image || defaultImage} className='userBlogImage' />
                                                <Card.Body className='text-center'>
                                                    <Card.Title>{blog.title}</Card.Title>
                                                    <Card.Text>
                                                        {blog.content}
                                                    </Card.Text>
                                                </Card.Body>
                                                
                                            </Card>
                                        </Col>
                                    </>
                                ))
                            ) : (
                                <>
                                    <div>
                                        <h1>NO Blogs Created ! </h1>
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

export default BLogs

