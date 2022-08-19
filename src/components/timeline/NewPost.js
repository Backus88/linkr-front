import styled from "styled-components";
import { IoIosSync } from "react-icons/io";
import useInterval from 'use-interval'
import React, { useState } from "react"
import axios from "axios"
export default function NewPosts(props) {
    const URI = process.env.REACT_APP_DATABASE_URI
    const local = localStorage.getItem("token");
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0)
    const { post, getPost, loading, setPost } = props
    function update(){
        setPost([])
        getPost()
        setVisible(false)
    }
    function newsPosts(){
        const config = {
            headers: {
                "Authorization": 'Bearer ' + local
            }
        }    
        if(!loading){
            const promise = axios.get(`${URI}/post`, config)
            promise.then(response => {
                let data = [...response.data]
                if(data[0].id > post[0].id){
                    let difference = data[0].id - post[0].id
                    setCount(difference)
                    setVisible(true)
                }
            })
        }
     
    }
    useInterval(newsPosts,15000)
    return (
        <> 
       {visible ?
            <NewPost onClick={update}>
                <DFlex>
                    <h2>{count} new posts, load more!</h2>
                    <Icon />
                </DFlex >
            </NewPost >
            :
            null
             }
        </>
      
    )
}

const NewPost = styled.div`
background: #1877F2;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
width: 560px;
height: 50px;
`
const DFlex = styled.div`
display: flex;
justify-content: center;

h2{
font-size: 18px;
color: #FFFFFF;
margin-top: 15px;

}
`
const Icon = styled(IoIosSync)`
color: #FFFFFF;
margin-left: 5px;
margin-top: 17px;
width: 20px;
`
