import React, { useState } from "react";
import BoardList from "./BoardList.jsx"
import { Link } from "react-router-dom";

function Homepage(){
    const [m, setM] = useState("");
    const [e, setE] = useState("");
    const [r, setR] = useState("");
    const [n, setN] = useState("");

    //selected fx
    const [englishFx, setEnglishFx] = useState(true);
    const [menuToStyle, setMenuToStyle] = useState("skills");

    const [aboutContent, setAboutContent] = useState(
        <h5>
        Front-End Web Development:<br/> HTML, CSS, Bootstrap, Javascript, DOM manipulation and jQuery.<br/><br/>
        Back-end Web Development:<br/> ReactJS, NodeJS, ExpressJS, MongoDB, mongoose, EJS, REST, APIs and Authentication.<br/><br/>
        My course completion certificate for "The Complete 2022 Web Development Bootcamp": <a href="http://ude.my/UC-741c761c-0fd5-4e66-bb8f-d321b8aef5c2">here</a> via @udemy 
        </h5>
    );
    const [whatLanguage, setWhatLanguage] = useState("english");

    function setAbout(){
        if (whatLanguage==="english"){
            setAboutContent(
                <h5>
                    Hey there, my name is Vitor.<br/>
                    I was born in 1994, im from Brazil, i do enjoy computer, eletric-guitar, internet, games, tea and some coffe.<br/>
                    My compulsive computer use has always been part of my routine, so, 
                    I was introduced to a course where I learned to use different development technologies, 
                    Since then, I've been learning and practicing, in order to become apt to get a job as a Fullstack Junior Web Developer.
                </h5>
            )
        } else if (whatLanguage==="portuguese"){
            setAboutContent(
                <h5>
                    Prazer, meu nome é Vitor.<br/>
                    Sou de 1994, gosto de computador, guitarra, internet, jogos, chá e café.<br/>
                    O uso compulsivo de computador sempre fez parte da minha rotina, então, 
                    fui apresentado para um curso no qual aprendi a utilizar diversas tecnologias 
                    de desenvolvimento, desde então venho aprendendo e praticando, afim de me tornar hábil para o mercado de trabalho como Desenvolvedor Web Junior Fullstack.
                </h5>
            )
        }
    }
    function setSkills(){
        if (whatLanguage==="english"||whatLanguage==="portuguese"){
            setAboutContent(
                <h5>
                    Front-End Web Development:<br/> HTML, CSS, Bootstrap, Javascript, DOM manipulation and jQuery.<br/><br/>
                    Back-end Web Development:<br/> ReactJS, NodeJS, ExpressJS, MongoDB, mongoose, EJS, REST, APIs and Authentication.<br/><br/>
                    My course completion certificate for "The Complete 2022 Web Development Bootcamp": <a href="http://ude.my/UC-741c761c-0fd5-4e66-bb8f-d321b8aef5c2">here</a> via @udemy 
                </h5>
            )
        }
    }
    function setContact(){
        if (whatLanguage==="english"||whatLanguage==="portuguese"){
            setAboutContent(
                <h5>
                    Email: <a href="mailto:vitosdeveloper@gmail.com">vitosdeveloper@gmail.com</a><br/>
                    Github: <a href="https://github.com/vitosnatios">https://github.com/vitosnatios</a><br/>
                    Linkedin: <a href="https://www.linkedin.com/in/vitosnatios/">https://www.linkedin.com/in/vitosnatios/</a><br/>
                </h5>
            )
        }
    }

    return (
        <div>
        <BoardList />
        <div className="homeBox">
            
            <small className="mOverOnePosition">mouse over ⇾</small>
            <h1 className="homeFont">
            
            <div className="letterDiv" onMouseOver={()=>setM("Mongo DB")} onMouseOut={()=>setM("")}>
            <i className="boardLink noItalic"><span className="miniLetter">{m}</span>
            <span>M</span></i>
            </div>

            <div className="letterDiv" onMouseOver={()=>setE("Express")} onMouseOut={()=>setE("")}>
            <i className="boardLink noItalic"><span className="miniLetter">{e}</span>
            <span>E</span></i>
            </div>

            <div className="letterDiv" onMouseOver={()=>setR("ReactJS")} onMouseOut={()=>setR("")}>
            <i className="boardLink noItalic"><span className="miniLetter">{r}</span>
            <span>R</span></i>
            </div>

            <div className="letterDiv" onMouseOver={()=>setN("NodeJS")} onMouseOut={()=>setN("")}>
            <i className="boardLink noItalic"><span className="miniLetter">{n}</span>
            <span>N</span></i>
            </div>
            <span> </span>stack based<br/>imageboard
            </h1>

            <small className="mOverThreePosition">Enter the site ⇾</small>
            <h1 className="homeFontButLesslineHeight">
            <Link className="boardLink" to="/hw">
            <i><span className="noItalic">/HW/</span><br/>
            <span className="smallFontHome">Hello, world!</span>
            </i>
            </Link>
            </h1>
            <div><small className="mOverTwoPosition">mouse over ⇾</small></div>
            <div className="divContent">
                <div className="language">
                    <label style={englishFx?{backgroundColor: "#e9caa2", border: "1px double #543c1d"}:null} onMouseOver={()=>{setWhatLanguage("english"); setEnglishFx(true)}}>English</label><span> </span>
                    <label style={!englishFx?{backgroundColor: "#e9caa2", border: "1px double #543c1d"}:null} onMouseOver={()=>{setWhatLanguage("portuguese"); setEnglishFx(false)}}>Portuguese</label>
                </div>
                <div style={menuToStyle==="about"?{backgroundColor: "#e9caa2", border: "1px double #543c1d"}:null} className="aboutBox" 
                onMouseOver={()=>{setAbout(); setMenuToStyle("about")}} >
                    {whatLanguage==="portuguese"?"Sobre mim":"about"}
                </div>
                <div style={menuToStyle==="skills"?{backgroundColor: "#e9caa2", border: "1px double #543c1d"}:null} className="aboutBox" 
                onMouseOver={()=>{setSkills(); setMenuToStyle("skills")}}>
                    {whatLanguage==="portuguese"?"Skills":"Skills"}
                </div>
                <div style={menuToStyle==="contact"?{backgroundColor: "#e9caa2", border: "1px double #543c1d"}:null} className="aboutBox" 
                onMouseOver={()=>{setContact(); setMenuToStyle("contact")}}>
                {whatLanguage==="portuguese"?"Contato":"Contact"}
                </div>
                <div className="aboutContent">
                    {aboutContent}
                </div>
            </div>
            

            <div>
            <a className="emotis" href="https://github.com/vitosnatios"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" className="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg></a>
            <a className="emotis" href="https://www.linkedin.com/in/vitosnatios/"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" className="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
            </svg></a>
            </div>
        </div>
        
        </div>
    )
}
export default Homepage;