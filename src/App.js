import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react";

export default function App() {

    const [selecionado,setSelecionado] = useState({ids: [], name: "", cpf: ""});
    const [compra,setCompra] = useState({nomeFilme: "", diaFilme: "", horaFilme: ""});
    const [assentosSelecionados,setAssentosSelecionados] = useState([]);

    const [botaoVoltar,setBotaoVoltar] = useState("");

    return (
        <BrowserRouter>
                <Voltar botaoVoltar={botaoVoltar}><Link to={botaoVoltar} data-test="go-home-header-btn"><ion-icon name="arrow-back-outline"></ion-icon></Link></Voltar>
                <NavContainer>CINEFLEX</NavContainer>

            <Routes>
                <Route path="/" element={<HomePage selecionado={selecionado} setSelecionado={setSelecionado} setAssentosSelecionados={setAssentosSelecionados} setBotaoVoltar={setBotaoVoltar}/>}/>
                <Route path="/assentos/:idSessao" element={<SeatsPage selecionado={selecionado} setSelecionado={setSelecionado} compra={compra} setCompra={setCompra} assentosSelecionados={assentosSelecionados} setAssentosSelecionados={setAssentosSelecionados} setBotaoVoltar={setBotaoVoltar} />}/>
                <Route path="/sessoes/:idFilme" element={<SessionsPage setBotaoVoltar={setBotaoVoltar}/>}/>
                <Route path="/sucesso" element={<SuccessPage selecionado={selecionado} compra={compra} assentosSelecionados={assentosSelecionados} setBotaoVoltar={setBotaoVoltar}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    background-color: #C3CFD9;
    position: fixed;
    left: 0;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

const Voltar = styled.div`
    display: ${props => props.botaoVoltar === "" ? "none" : "flex"};
    justify-content: flex-end;
    align-items: center;
    width: 45px;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    ion-icon{
        font-size: 30px;
        color: #000000;
    }
`