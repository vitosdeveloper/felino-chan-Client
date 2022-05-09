import React, { useState } from "react";
import Replys from "./Replys.jsx";
import Axios from "axios";
import useLocalStorage from "use-local-storage";
import $ from 'jquery';
import { Interweave } from 'interweave';

function Thread(props){//talvez eu nao precise mais disso, utilizar 
    
    let wat = "<p class='everyPostP'>" + props.threads.postContent.replace(/\n/g, "<p class='everyPostP'>");
    function a(){

        $("p").each(function(){
            if ($(this).text().indexOf(">>>")===0){
                $(this).addClass("pinkText everyPostP")
            } else if ($(this).text().indexOf(">>")===0){
                $(this).addClass("quotin")
                $(this).on("mouseover", (e)=>{
                        var div = $("<div class='replyDemo'>")
                        .css({
                            "left": e.pageX + "px",
                            "top": e.pageY + "px"
                        }).append(
                            props.replys.map((item)=>{
                                if (item.randomIdGeneratedByMe === $(this).html().slice(8)){
                                    var watReply = "<p class='everyPostP'>" + item.postContent.replace(/\n/g, "</p><p class='everyPostP'>")
                                    function b(){
                                    $("p").each(function applyCollors(){
                                        if ($(this).text().indexOf(">>>")===0){
                                            $(this).addClass("pinkText everyPostP")
                                        } else if ($(this).text().indexOf(">>")===0){
                                            $(this).addClass("quotin")} else if ($(this).text().indexOf(">")===0){
                                                $(this).addClass("quote everyPostP")
                                            }
                                        })
                                    }
                                    setTimeout(()=>{b()},1)
                                    return (
                                    `
                                    <div class="replyBoxDemo">
                                    <p class="replyNameLine"><span class="anonName" style="margin-left: 10px;"> ${item.assunto} <a class="aTirarSublinhado" style=${"#"+item.email==="#sage" ? {color: "#0F167A"} : null } href=${"#"+item.email}>${"#"+item.email==="#sage" ? "Sage!" : "Anônimo"}</a></span>${item.postDay} No.${item.randomIdGeneratedByMe}</p>
                                    <div class="detailsDiv">
                                    <div class="divFloat">
                                    <i class="paddingPadrao aTirarSublinhado ">
                                    <img src=${item.catUrl} class="textToRight" alt="gatinho" style="margin-top: 8px; max-width: 255px; maxheight: 255px"/> 
                                    </i>
                                    </div>
                                    <span>${watReply}</span>         
                                    </div>        
                                    </div>
                                    `
                                    )
                                }
                                return null}
                            )
                        )
                        .appendTo(document.body);
                        $(this).on("mouseout", ()=>{div.remove()})   
                })
            } else if ($(this).text().indexOf(">")===0){
                $(this).addClass("quote everyPostP")
            }
        })
    }
    setTimeout(()=>{a()},200);

    const [postPassword] = useLocalStorage("postFormPassword", );
    
    const [threadHidden, setThreadHidden] = useLocalStorage(props.threads.randomIdGeneratedByMe, false);

    const [deleteBox, setDeleteBox] = useState(false);
    function deletePosts(){
        deleteBox ? setDeleteBox(false) : setDeleteBox(true)
    }

    //deleta itens da página secreta /11, os q excedem o número de páginas
    const [idDaqui] = useState({randomIdGeneratedByMe: props.threads.randomIdGeneratedByMe});

    const [imgHidden, setImgHidden] = useLocalStorage(props.threads.randomIdGeneratedByMe+"hide", false);
    function hideImage(){
        imgHidden?setImgHidden(false):setImgHidden(true);
    }

    const [imgBig, setImgBig] = useState(false);
    function imgSizeUp(){
        imgBig ? setImgBig(false) :  setImgBig(true)
    }


    if (props.delete === true ){
        Axios.post("https://felino-chan-server.herokuapp.com/deletePost", {idDaqui})
        setTimeout(()=>{document.location.reload()},1000)
    }

    let count = 0;
    function countAdd(){
        count++
    }

    const threadsData = props.threads;
    
    const [passDaqui, setPassDaqui] = useState(postPassword);
    function senhaAtual(event){
        setPassDaqui(event.target.value)
    }
    function deleteThread(){
        Axios.post("https://felino-chan-server.herokuapp.com/deletePostButton", {teste: [{threadsData}, passDaqui]});
        setTimeout(()=>{window.location.replace("/hw")},1000)
    }

    return (            
      
        <div name="total">
            <div className="hiddenOnes" style={!threadHidden ? {display: "none"} : null}>
            <p className="anonNameLine"><a className="aTirarSublinhado" onClick={()=>{!threadHidden?setThreadHidden(true):setThreadHidden(false)}} href="#hideThread">[+] </a>
            <input type="checkbox"/><span className="anonName"> {props.threads.assunto} <span className="aTirarSublinhado" href="#">Anônimo </span>
            </span>{props.threads.postDay} No.{props.threads.randomIdGeneratedByMe}</p>
            </div>

        <div className="threadModel" style={threadHidden ? {display: "none"} : null}>
            
            <p className="arquivoDetalhes"><a className="aTirarSublinhado" onClick={()=>{!threadHidden?setThreadHidden(true):setThreadHidden(false)}} href="#hideThread">[–] </a>
            
            Arquivo <small>(<a className="aTirarSublinhado" onClick={hideImage} href="#esconderImg">{imgHidden ? "mostrar imagem" : "esconder imagem"}</a>):
            <a className="aTirarSublinhado" href={props.threads.catUrl}> gatinho :3 </a>
            (???? KB, {props.threads.catWidth}x{props.threads.catHeight})
            </small></p>
            
            <div className="detailsDiv">
            <div className="divFloat">
            
            <i className="paddingPadrao aTirarSublinhado" onClick={imgSizeUp} style={imgHidden ? {display: "none"} : null} >
            {!imgBig?
                <img src={props.threads.catUrl} className="textToRight" alt="gatinho" style={{maxWidth: "255px", maxHeight: "255px"}} /> 
                : <img src={props.threads.catUrl} className="textToRight" alt="gatinho" style={{maxWidth: "1000px", maxHeight: "1000px"}}/>}
            </i>
            </div>

            <p className="anonNameLine"><input type="checkbox" onClick={()=>{deletePosts()}}/><span className="anonName"> {props.threads.assunto} <a href={"#"+props.threads.email} className="aTirarSublinhado">Anônimo </a>
            </span>{props.threads.postDay} No.{props.threads.randomIdGeneratedByMe} <a className="linkColor" href={"/res/"+props.threads.randomIdGeneratedByMe+"/"}><span className="linkColor">[Responder]</span></a> {deleteBox ? <p className="deleteButton4Threads">Senha: <input name="inputForDeleting" onChange={senhaAtual} value={passDaqui} type="password" maxLength="6" style={{width: "5rem"}}/>  <button onClick={deleteThread}>Delete</button></p> : null}</p>
            {   
                <Interweave content={wat} />
            }
            
            </div>
            
            
            {props.replys.map((item, index) => (
            
            props.threads.randomIdGeneratedByMe === item.reply ?
            
            count < 5 ?

            <div key={index}>
            {countAdd()}
            <Replys key={index} index={index} replyData={item}/><br/>
            </div>

            :null

            :null    

            )).reverse()//inverte a ordem do render do map, assim posso dar map na data de ordem normal e conseguir o resultado sonhado
            
            }

          <hr className="hrWithoutBottomMargin"/>
          
        </div>
        
        </div>
    )
}

export default Thread;