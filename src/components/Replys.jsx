import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import Axios from "axios";
import { Interweave } from 'interweave';

function Replys(props){
    //greentext
    let wat = "<p class='everyPostP'>" + props.replyData.postContent.replace(/\n/g, "<p class='everyPostP'>");//o resto das propriedades é pego pelo ThreadForReplys

    const [postPassword] = useLocalStorage("postFormPassword", );

    const [deleteBox, setDeleteBox] = useState(false);
    function deletePosts(){
        deleteBox ? setDeleteBox(false) : setDeleteBox(true)
    }

    const [imgBig, setImgBig] = useState(false);
    function imgSizeUp(){
        imgBig ?  setImgBig(false) :  setImgBig(true)
    }

    const [imgHidden, setImgHidden] = useLocalStorage(props.replyData.randomIdGeneratedByMe+"replyHidd", false);
    function hideImage(){
        imgHidden?setImgHidden(false):setImgHidden(true)
    }

    const replyData = props.replyData;
    
    const [passDaqui, setPassDaqui] = useState(postPassword);
    function senhaAtual(event){
        setPassDaqui(event.target.value)
    }
    
    function deleteThread(){
        Axios.post("https://felino-chan-server.herokuapp.com/deleteReplys", {teste: [{replyData}, passDaqui]});
        setTimeout(()=>{window.location.reload()},1000)
    }


    return (
        <div className="replyBox" ><i id={props.replyData.randomIdGeneratedByMe}></i>
        <div></div>
        <p className="replyNameLine"><input onClick={()=>{deletePosts()}} type="checkbox"/><span className="anonName"> {props.replyData.assunto} <a className="aTirarSublinhado" style={"#"+props.replyData.email==="#sage" ? {color: "#0F167A"} : null } href={"#"+props.replyData.email}>{"#"+props.replyData.email==="#sage" ? "Sage!" : "Anônimo"}</a></span>{props.replyData.postDay} No.{props.replyData.randomIdGeneratedByMe}</p>

        <p className="arquivoDetalhes"><br/>
        
        {/*  */props.replyData.imgShow===true? <small><span className="arquivO">Arquivo</span> (<a className="aTirarSublinhado" onClick={hideImage} href="#esonderImg">{imgHidden ? "mostrar imagem" : "esconder imagem"}</a>):
        <a className="aTirarSublinhado" href={props.replyData.catUrl}> gatinho :3</a> 
        (???? KB, {props.replyData.catWidth}x{props.replyData.catHeight})
        </small>: null }</p> 

        <div className="detailsDiv">

        <div className="divFloat">
        
        <i className="paddingPadrao aTirarSublinhado " onClick={imgSizeUp} style={imgHidden ? {display: "none"} : null}>
        {(props.replyData.imgShow ?  
                !imgBig ? <img src={props.replyData.catUrl} className="textToRight" alt="gatinho" style={{maxWidth: "255px", maxHeight: "255px"}}/> 
                : <img src={props.replyData.catUrl} className="textToRight" alt="gatinho" style={{maxWidth: "1000px", maxHeight: "1000px"}}/> 
            : null)
        }
        </i>
        </div>
        
        
        {!props.replyData.imgShow ? 
                    <Interweave content={wat} />
        :   
                    <Interweave content={wat} />
        }
        
        
        </div>
        {deleteBox ? <p className="deleteButton">Senha: <input type="password" maxLength="6" style={{width: "5rem"}} value={passDaqui} onChange={senhaAtual} />  <button onClick={deleteThread}>Delete</button></p> : null} 
        
    </div>
    
    )
}

export default Replys;