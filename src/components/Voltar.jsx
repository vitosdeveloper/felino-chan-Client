import React from "react";
import { Link } from "react-router-dom";

function Voltar(props){
    return (
        <Link name="bottom" className="linkColor" to={"/"+props.url}><span className="boardLinks voltarBut">[Voltar]</span></Link>
    )
}

export default Voltar;