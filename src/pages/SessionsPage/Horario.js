import { Link } from "react-router-dom";

export default function Horario({hor}){
    return (
        hor.showtimes.map( horario => {
            return <Link to={`/assentos/${horario.id}`} key={horario.id}><button data-test="showtime" >{horario.name}</button></Link>
        })
    )
}