import Post from "./Post"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import React from "react";

export default function PostById(){
    const [id, setId] = useState(parseInt(useParams()));
    const paramId = parseInt(useParams());
    const [userPage, setUserPage]= useState(false);
    useEffect(()=>{
        console.log(userPage);
        setId(paramId);
        setUserPage(true);
    },[id])
    return(
        <Post id={id} userPage = {userPage}/>
    )
}
    