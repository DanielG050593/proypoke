import { useRef } from "react"
import { setTrainerNameG } from "../store/slices/trainerName.slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/Home.css'

const Home =()=>{
    const trainerNameRef=useRef()

    const navigate= useNavigate()
    const dispatch= useDispatch()

    const handleSubmit =e=>{
        e.preventDefault()
       dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
       navigate('/pokedex')
    }



    return(
        <div className="home">
        <h1 className="title">Pokedex</h1>
        <h2 className="sub__title">Hi Trainer!</h2>
        <p>To start in this application, please, give me your trainer name.</p>
        <form className="form" onSubmit={handleSubmit}>
          <input className="input" ref={trainerNameRef} type="text" placeholder="Tu nombre..." />
          <button className="btn">Comenzar</button>
        </form>
      </div>
    )
}
export default Home