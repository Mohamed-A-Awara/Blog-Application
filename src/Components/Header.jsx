import { Container, Nav, Navbar, } from "react-bootstrap"
import { Link, } from 'react-router-dom'
import { useEffect, useState } from "react"

// Styles 
import '../Styles/Header.style.css'
import Dropdownlist from "./DropDown"

// Import Icons
// import { MdOutlineDarkMode } from "react-icons/md";

// Import Files Of Api
import { fetchUserData } from '../Redux/Reducers/user';
import { useDispatch, useSelector } from "react-redux"

function NavbarComponent() {

    // Scroll background
    const [scrolled, setScrolled] = useState(false)
    const dispatch = useDispatch()
    const isLoginUser = useSelector((state) => state.user.isLogin)
    const user = useSelector((state) => state.user.data)
    // console.log(user);
    
    useEffect(() => {
        dispatch(fetchUserData())

        const handleScroll = () => {
            const isScrolled = window.scrollY > 100
            setScrolled(isScrolled)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <>
            <Navbar
                expand="lg"
                className={scrolled ? " navbar-scroll nav-height " : "nav-height"}
                fixed="top"
            >
                <Container fluid>
                    <Navbar.Brand href="#" className="logoName"> awara </Navbar.Brand>

                    <button className="navbar-toggler btn-responsive collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="toggler-icon top-bar"></span>
                        <span className="toggler-icon middle-bar"></span>
                        <span className="toggler-icon bottom-bar"></span>
                    </button>

                    <Navbar.Collapse id="navbarScroll" className="nav-small">
                        <Nav
                            className="ms-auto my-2 my-lg-0 links-block"
                            navbarScroll
                        >
                            {isLoginUser && <Link to='/home' className="activeLink">Home</Link>}

                            {isLoginUser && user.message.isAdmin && <Link to='/blogs' >Blogs</Link>}

                            {isLoginUser &&
                                <>
                                    <Link to='/my-blogs' >My Blogs</Link>
                                    <Link to='/create-blog'>Create Blog</Link>
                                </>}

                        </Nav>
                        <div className="dropStyle">
                            <Dropdownlist />
                        </div>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent
