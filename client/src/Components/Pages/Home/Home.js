import "./Home.css"
import Navbar from "../../Navbar/Navbar"
import { GET_SALOONS_URL } from "../../../Constants/Constants"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from '../../../Context/Context'
import Footer from '../../Footer/Footer'
const Home = () => {
    const [saloons, setSaloons] = useState([])
    const navigate = useNavigate()
    const { setSaloonId } = useContext(UserContext)

    useEffect(() => {
        fetchSaloons()
    }, [])

    const fetchSaloons = async () => {
        try {
            const response = await fetch(GET_SALOONS_URL)
            const data = await response.json()
            setSaloons(data)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleBookNow = (saloonId) => {
    //     console.log(saloonId)
    //     navigate(`/saloon/${saloonId}`)
    // }



    return (
        <div className="home-container">
            <Navbar />
            <h1 style={{ color: "#CEC3FD" }}>Saloon's list</h1>
            <div className="saloons-list-container">

                {saloons?.map((saloon) => (
                    <div className="saloon-card">
                        <div className="saloon-name-container" key={saloon?.id}>
                            <h2>{saloon.name}</h2>
                            <p>{saloon.description}</p>
                            <p>{saloon.address}</p>
                            <p>{saloon.phone}</p>
                        </div>


                        <div className="saloon-timings-container">
                            <p>{`Timings: ${saloon.timings}`}</p>
                            <p>{`Rating: ${saloon.rating}`}</p>
                            <p>{`Email: ${saloon.email}`}</p>
                        </div>

                        <div className="booking-container">
                            <button className="booking-container"><Link className="nav-item" to={`/saloon/${saloon.id}`} onClick={() => setSaloonId(saloon.id)}>View Details</Link></button>
                        </div>
                    </div>
                ))}

            </div>
            <Footer />
        </div>
    )
}

export default Home

