import BoardList from "./BoardList.jsx";
import React, { useEffect, useState } from "react";
import CatalogItems from "./CatalogItems.jsx";
import Footer from "./Footer.jsx";

function Catalog(){
    
    const [catalogData, setCatalogData] = useState([]);

    useEffect(() => {
        fetch("https://felino-chan-server.herokuapp.com/api").then(
          response => response.json()
          ).then(
            data => {
              setCatalogData(data)
            }
          )  
      }, []);

    return (
        <div>
        <div className="catalog">
        <BoardList />
        
        <h1 href="#top">"Catalog (/hw/)"</h1>

        { catalogData.length === 0 ? <h1 style={{marginLeft: "30px", color: "#77654e"}}>ฅ^•ﻌ•^ฅ Loading...</h1> :
          catalogData.map((item, index)=>(
            item.op ?
                <CatalogItems allContent={item} CatalogContent={item.postContent} CatalogimgContent={item.catUrl} imgUrl={"res/"+item.randomIdGeneratedByMe}/>
                : null
            ))
        }
        <Footer />
        </div>
        </div>
    )
}

export default Catalog;