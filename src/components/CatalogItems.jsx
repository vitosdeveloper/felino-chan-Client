import React from "react";
import $ from 'jquery';
import { Interweave } from 'interweave';

function CatalogItems(props){

    let wat = "<p class='everyPostP'>" + props.CatalogContent.replace(/\n/g, "<p class='everyPostP'>");

    function a(){

        $("p").each(function(){
            if ($(this).text().indexOf(">>>")===0){
                $(this).addClass("pinkText everyPostP")
            } else if ($(this).text().indexOf(">>")===0){
                $(this).addClass("quotin")
            } else if ($(this).text().indexOf(">")===0){
                $(this).addClass("quote everyPostP")
            }
        })
    }
    
    setTimeout(()=>{a()},200);

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
                <Interweave content={wat} />
            }
            
        </div>
        </div>
        </div>
    )
}

export default CatalogItems;