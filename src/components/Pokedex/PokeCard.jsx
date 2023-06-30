import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import './styles/PokeCard.css'

const PokeCard = ({ url }) => {

  const [ pokemon, getPokemonById ] = useFetch(url)

  useEffect(() => {
    getPokemonById()
  },[])

   const navigate = useNavigate()

  const handleNavigate = () => {
     navigate(`/pokedex/${pokemon.name}`)
  }

  return (
    <article className={`pokecard ${pokemon?.types[0].type.name}`} onClick={handleNavigate} style={{ border: '5px solid black'}}>
      <header className={`pokecard__header bg-${pokemon?.types[0].type.name}`}>
        <img 
        className="pokecard__img"
        src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <section className="pokecard__body">
        <h3 className="pokecard__name">{pokemon?.name}</h3>
        <ul className="pokecard__types">
          {
            pokemon?.types.map( typeInfo => (
              <li
              className="pokecard__types-item" 
                key={typeInfo.type.url}>{typeInfo.type.name}</li>
            ))      
            }
        </ul>
       </section> 
       <footer className="pokecard__footer">
          <ul className="pokecard__stats">
             {
              pokemon?.stats.map(statInfo =>(
                <li
                className="pokecard__stats-item"
                  key={statInfo.stat.url}>
                  <span className="pokecard__stats-label">{statInfo.stat.name}</span>
                  <span className="pokecard__stats-value">{statInfo.base_stat}</span>
                </li>
              ))
             }
          </ul>
        </footer>
      
    </article>
  )
}

export default PokeCard