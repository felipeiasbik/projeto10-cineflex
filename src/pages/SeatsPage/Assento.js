import styled from "styled-components";

export default function Assento({filme}){
    return (
        filme.seats.map( ass => {
            return <SeatItem key={ass.id} cor={ass.isAvailable}>{ass.name}</SeatItem>
        })
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => props.cor === false ? "#F7C52B" : "#808F9D"};
    background-color: ${props => props.cor === false ? "#FBE192" : "#C3CFD9"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`