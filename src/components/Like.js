import React from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";


export default function Like(){

    const idPost = 1;

    const URL = `http://localhost:4000/posts/${idPost}/likes`;
    const {info} = useContext(UserContext);
    console.log(info)

    const config = {
        headers:{
            "Authorization": `Bearer ${info}`
        }
    };

    const [likesUsers, setLikesUsers] = useState([]);
    const [likesQuantity, setLikesQuantity] = useState(0);
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [usersnamesThatLiked, setUsersnamesThatLiked] = useState('');
    
    async function fetchLikes(){
        try {
            const response = await axios.get(URL, config);
            handleSucess(response);

        } catch (error) {
            console.log(error.data.details);
        }
    };
    
    useEffect(()=>{
        fetchLikes();
    }, []);

    function handleSucess(res){
        setLikesUsers(res.data.users);
        setLikesQuantity(res.data.quantity);
        setUserHasLiked(res.data.hasUserLiked);
        console.log(res.data);
    }


    async function dislikePost(){
        try {
            
            const response = await axios.delete(`${URL}`, config);
            console.log(response)
            fetchLikes();

        } catch (error) {
            console.log(error.response.data.message);
        }

    };

    async function likePost(){
        try {
            
            const response = await axios.post(`${URL}`, "", config);
            console.log(response);
            fetchLikes();

        } catch (error) {
            console.log(error.response.data.message);
        }

    }

    function renderLikeIcon(){

        if(userHasLiked) return <LikedIcon onClick={dislikePost}/>
        else return <UnlikedIcon onClick={likePost}/>
    }

    const likeIcon = renderLikeIcon();

    function renderLikesTooltip(){

        if(userHasLiked && likesQuantity == 1) return <> <p data-tip= 'Você' > {`${likesQuantity} likes`}</p>        
            <ReactTooltip place="bottom" type="light"/> </>        
        else if(userHasLiked && likesQuantity ==2) return <> <p data-tip= {`Você e ${likesUsers[0]}`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(userHasLiked && likesQuantity >2) 
        return <> <p data-tip= {`Você, ${likesUsers[0]} e outras ${likesUsers.length - 1} pessoas`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(likesQuantity == 1) return <> <p data-tip= {`${likesUsers[0]}`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(likesQuantity == 2) return <> <p data-tip= {`${likesUsers[0]} e ${likesUsers[1]}`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(likesQuantity > 2) return <> <p data-tip= {`${likesUsers[0]}, ${likesUsers[1]} e outras ${likesUsers.length - 1} pessoas`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        
    }

    const toRenderLikesTooltip = renderLikesTooltip();

    return(
        <LikeBox> 
            {likeIcon}
            <NumberLikes>
                {toRenderLikesTooltip} 
            </NumberLikes>
        </LikeBox>
    )
};

const LikeBox = styled.div`
position:relative;
top: 86px;

width: 87px;

display: flex;
flex-direction: column;
align-items: center;
`

const UnlikedIcon = styled(AiOutlineHeart)`
width: 20px;
height: 18px;
color: #FFFFFF;
`

const LikedIcon = styled(AiFillHeart)`
width: 20px;
height: 18px;
color: #AC0000;
`

const NumberLikes = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;
text-align: center;

color: #FFFFFF;
padding-top: 4px;
`
