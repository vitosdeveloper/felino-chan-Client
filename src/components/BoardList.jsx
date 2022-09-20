import React from "react";
import { Link } from "react-router-dom";

function BoardList(){
    return (
        <div className="boardList">
        <i name="top"></i>
        [ <Link className="boardLinks" to="/">home </Link> /
            <Link className="boardLinks" to="/hw"> hw</Link> /
            <Link className="boardLinks" to="/catalog"> catalog</Link> ]
        </div>
    )
}

export default BoardList;