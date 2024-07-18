import { } from 'react'

// Import Styles and Images 
import '../Styles/Home.style.css'
import HomeImage from '../assets/Images/homeImage.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Home() {

    const navigate = useNavigate()
    const userLogin  = useSelector((state)=> state.user.isLogin)
    // console.log(userLogin);
    const handlerStarted = ()=>{
        if (userLogin){
            return navigate("/create-blog")
        }
        navigate('/login')
    }


    const openDemo = ()=>{
        window.open('')
    }

    return (
        <section className='AllParent '>
            <div className="homeParent">
                <div className="homeContent">
                    <div className="ContentParent">
                        <h2>Producing quality content for users</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum cum corrupti, dignissimos placeat voluptates eaque? Excepturi, porro velit. Perferendis ipsa similique iusto ab mollitia iure.</p>
                        <div className="homeBtns">
                            <button className='btnGet'
                                onClick={handlerStarted}
                            >
                                Get Started
                            </button>
                            <button className='btnView'>
                                View Demo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="homeImage">
                    <img src={HomeImage} alt="logo" />
                </div>
            </div>
        </section>
    )
}

export default Home