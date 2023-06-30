import PokeCard from './PokeCard';
import './styles/PokeContainer.css'

const PokeContainer = ({pokemons}) => {

  return (
    <div className='container'>
      {
            pokemons?.map(pokemon => (
                
                <PokeCard
                    key={pokemon.url}
                    url={pokemon.url}
                />
                
            ))
      }
    </div>
  )
}

export default PokeContainer