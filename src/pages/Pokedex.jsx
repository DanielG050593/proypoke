import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import PokeContainer from "../components/Pokedex/PokeContainer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './styles/Pokedex.css'

const Pokedex=()=>{
    
    const [selectValue,setSelectValue]=useState('all-pokemons')

    const trainerName = useSelector(states => states.trainerName)
    let url= 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    if(selectValue !== 'all-pokemons'){
        url=selectValue
    }

    

    const [pokemons, getAllPokemons, hasError, setPokemons]=useFetch(url)
    const urlTypes='https://pokeapi.co/api/v2/type'
    const [types, getAlltypes]=useFetch(urlTypes)

    useEffect(()=>{
        if(selectValue==='all-pokemons'){
          getAllPokemons()  
        }else{
            axios.get(selectValue)
                .then(res=>{
                    const data={
                        results: res.data.pokemon.map(pokeInfo=>pokeInfo.pokemon)
                    }
                    setPokemons(data)
                })
                .catch(err=>console.log(err))
        }
        
        
    },[selectValue])

    useEffect(()=>{
        
        getAlltypes()
    },[])

    const searchPokemon=useRef()
    const navigate=useNavigate()

    const handleSubmit=e=>{
        e.preventDefault()
        const inputValue=searchPokemon.current.value.trim().toLowerCase()
        navigate(`/pokedex/${inputValue}`)
    }

    const handleChangeType =e=>{
        setSelectValue(e.target.value)
    }


    return(
        <div className="poke__cont">
            <p>Welcome <span>{trainerName}</span>!, you can find your favorite pokemon</p>
        <form className="form__cont"onSubmit={handleSubmit}>
            <div className="form__search">
                <input className="input_search"ref={searchPokemon} type="text" placeholder="Busca un pokemón"/>
                <button className="btn__search">Buscar</button>
            </div>
            <div className="select__cont">
            <select className="options" onChange={handleChangeType}>
                <option value='all-pokemons'>All pokemons</option>
                {
                    types?.results.map(typeInfo=>(
                        <option 
                        value={typeInfo.url}
                        key={typeInfo.url}
                        >{typeInfo.name}</option>
                    ))
                }
            </select>
            </div>
        </form>
        <PokeContainer pokemons={pokemons?.results}/>
        
        </div>

    )
}
export default Pokedex