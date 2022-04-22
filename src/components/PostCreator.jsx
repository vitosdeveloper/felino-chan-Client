import React, { useState, useEffect } from "react";
import Axios from "axios";
import useLocalStorage from "use-local-storage";

function PostCreator(props){

    const [postCount, setPostCount] = useState("")//talvez a contagem só deva atualizar/dar get no momento em que se passa o botão em cima do "responder/criarthread", assim evita de duas pessoas postarem com o mesmo id
    const dayName = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]
    const diaDaSemana = dayName[new Date().getDay()];
    const dataNumero = new Date().toISOString().slice(0,10);
    const horaCompleta = new Date().getHours()+`:`+new Date().getMinutes()+`:`+new Date().getSeconds();
    const [finalHours, setFinalHour] = useState(`${dataNumero} ${diaDaSemana} ${horaCompleta}`);

        useEffect(() => {

            fetch("https://felino-chan-server.herokuapp.com/getId").then(
                response => response.json()
              ).then(
                data => {
                    setPostCount(data)
                }
              )
        }, []);

        const [newCat, setNewCat] = useState([{}])

        useEffect(() => {
            fetch("https://api.thecatapi.com/v1/images/search").then(
              response => response.json()
              ).then(
                data => {
                    setNewCat(data)
                }
              )  
        }, []);

 
    const [password, setPostPassword] = useLocalStorage("postFormPassword", "");
    const [isPasswordSetOrWhat, setIsPasswordSetOrWhat]  = useLocalStorage("isPassSetOrWhat", false);

    if (password.length===0 && isPasswordSetOrWhat===false){
        setPostPassword(Math.floor(Math.random()*1000000))
        setIsPasswordSetOrWhat(true);
    }

    function editLocalPassword(event){
        setPostPassword(event.target.value);
    }

    const [newPost, setNewPost] = useState ({
            op: "",
            board: "hw",
            email: "",
            assunto: "",
            postContent: "",
            inserir: "",
            password: password,
            reply: "",
            randomIdGeneratedByMe: 0,
            catUrl: "",
            catWidth: "",
            catHeight: "",
            postDay: finalHours
        })

    function editPost(event){
    
        const {name, value} = event.target

        setNewPost((lastValues)=>{
            return {
                ...lastValues,
                [name]: value,
                randomIdGeneratedByMe: postCount[0].postNumberIs,
                reply: props.replyTo,
                op: props.isOp,
                board: props.board,
                catUrl: newCat[0].url,
                catWidth: newCat[0].width,
                catHeight: newCat[0].height, 
            }
        });
    }

    //Post request
    function postToDatabase(){
        if (newPost.email !== "sage"){
            Axios.all([
                Axios.post("https://felino-chan-server.herokuapp.com/setNewId", {newPost}),
                Axios.post("https://felino-chan-server.herokuapp.com/newpost", {newPost}),
                
            ])
            }else{
            Axios.all([
                Axios.post("https://felino-chan-server.herokuapp.com/setNewId", {newPost}),
                Axios.post("https://felino-chan-server.herokuapp.com/replySage", {newPost}),
            ])
            }   
        setTimeout(()=>{window.location.replace("/hw")},1000)
    }

    return (
        <div>
        <div className="divPost">
        <form id="formita" className="postCreate">
        <table>
            <tbody>
                <tr>
                    <th>E-mail</th>
                    <td><input onChange={editPost} name="email" value={newPost.email} size="25"/></td>
                </tr>
                <tr>
                    <th>Assunto</th>
                    <td><input onChange={editPost} name="assunto" form="formita" size="25" value={newPost.assunto}/> 
                    {newPost.postContent.length <= 0 ? <button style={{opacity: "0.6", cursor: "not-allowed"}}>{props.sendButton}</button> : 
                        <button type="button" onMouseOver={()=>{setFinalHour(`${dataNumero} ${diaDaSemana} ${horaCompleta}`);}} onClick={()=>{
                        postToDatabase()}}>{props.sendButton}</button>}
                    </td>
                    </tr>
                <tr>
            
                    <th>Comentar</th>
                    {postCount === undefined ? "Loading..." : 
                        <td>{(newPost.postContent.length <= 0) ?
                        <textarea form="formita" minLength="1" required onMouseOver={()=>{setFinalHour(`${dataNumero} ${diaDaSemana} ${horaCompleta}`)}} onChange={(event)=>{editPost(event); }} name="postContent" rows="5" cols="35" value={newPost.postContent}>{newPost.postContent}</textarea>
                        : <textarea form="formita" minLength="1" onMouseOver={()=>{setFinalHour(`${dataNumero} ${diaDaSemana} ${horaCompleta}`)}} onChange={editPost} name="postContent" rows="5" cols="35" value={newPost.postContent}>{newPost.postContent}</textarea>
                        }
                        </td>
                    }
                    
                </tr>
                <tr>
                    <th>Arquivo</th>
                    <td><button onClick={(event)=>{event.preventDefault()}} style={{opacity: "0.6", cursor: "not-allowed"}}>Upload desativado</button>
                    
                    {props.catOption ? <input name="imgShow" type="checkbox" id="catImg" readOnly checked/> 
                    : <input name="imgShow" onChange={()=>{
                    newPost.imgShow ? newPost.imgShow=false : newPost.imgShow=true}
                            } type="checkbox" id="catImg" />}
                    
                    <label htmlFor="catImg" className="catCheckFont">Random Cat Images</label></td>
                </tr>
                <tr>
                    <th>inserir</th>
                    <td><input name="inserir" onChange={editPost} value="Desativado. Nunca se sabe." size="30" readOnly/></td>
                </tr>
                <tr>
                    <th>senha</th>
                    <td><input name="password" type="password" onChange={editLocalPassword} minLength="3" maxLength="6" form="formita" value={password} size="10"/></td>
                </tr>
            </tbody>
        </table>
        </form>
        </div>
        <hr className="hrPostCreator"/>
        <ul className="ulPost">
            <li>Lembre-se que o intuito desse imageBoard é servir de projeto para meu portfólio.</li>
            <li>Upload de imagens atualmente desativado para economizar data-base e evitar problemas legais.</li>
            <li>Quotes ainda estão parcialmente em desenvolvimento.</li>
            <li>Seja paciente com potenciais bugs, é meu primeiro projeto.</li>
            <li>Divirta-se.</li>
        </ul>
        <hr className="hrNoventa"/>
        <a className="boardLinks aPostCreator" href="#bottom">[Go to bottom] </a>
        <a className="boardLinks" href="/Catalog">[Catálogo]</a>
        <hr className="hrNoventa"/>
        </div>
    )
}

export default PostCreator;