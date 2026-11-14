import MoviesSection from '../components/MoviesSection'
import TechSection from '../components/TechSection'

export default function Cultura({ decada }) {
    return (
        <>
            <MoviesSection decada={decada} />
            <TechSection decada={decada} />
        </>
    )
}

