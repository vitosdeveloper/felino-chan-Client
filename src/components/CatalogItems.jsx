import React from "react";
import $ from 'jquery';
import { Interweave } from 'interweave';

function CatalogItems(props){

    let wat = props.CatalogContent.replace(/\n/g, "<p class='everyPostP'>");

    function c(){
        $("p").each(function(){
            if ($(this).text().indexOf(">>>")===0){
                $(this).addClass("pinkText everyPostP")
            } else if ($(this).text().indexOf(">>")===0){
                $(this).addClass("quotin everyPostP")
            } else if ($(this).text().indexOf(">")===0){
                $(this).addClass("quote everyPostP")
            } 
        })
    }
    setTimeout(()=>{c()},500);

    return (
        <div className="catalogItemBorder">
        <div className="um">
        <div>
        <a href={props.imgUrl}>
        <img className="dois" src={props.CatalogimgContent} alt="gatinho" />
        </a>
        </div>
        <div className="tres">
            {   
                <p className="everyPostP"><Interweave content={wat} /></p>
            }
            
        </div>
        </div>
        </div>
    )
}

export default CatalogItems;