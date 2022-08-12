import React from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";


export default function Like(){

    const URL = `http://localhost:4000/posts/2/likes`;
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
    useEffect(()=>{
        async function fetchLikes(){
            try {
                const response = await axios.get(URL, config);
                handleSucess(response);

            } catch (error) {
                console.log(error.data.details);
            }
        };

        fetchLikes();
    }, []);

    function handleSucess(res){
        setLikesUsers(res.data.users);
        setLikesQuantity(res.data.quantity);
        setUserHasLiked(res.data.hasUserLiked);
        const{quantity, users} = res.data;
        console.log(res.data);
    }

    function renderLikeIcon(){

        if(userHasLiked) return <LikedIcon/>
        else return <UnlikedIcon/>
    }

    const likeIcon = renderLikeIcon();


    function renderLikesTootip(){

        if(userHasLiked && likesQuantity == 1) return <> <p data-tip= 'Você' > {`${likesQuantity} likes`}</p>        
            <ReactTooltip place="bottom" type="light"/> </>        
        else if(userHasLiked && likesQuantity ==2) return <> <p data-tip= {`Você e ${likesUsers[0]}`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(userHasLiked && likesQuantity >2) 
        return <> <p data-tip= {`Você, ${likesUsers[0]} e ${likesUsers.length - 1} pessoas`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(likesQuantity == 1) return <> <p data-tip= {`${likesUsers[0]}`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(likesQuantity == 2) return <> <p data-tip= {`${likesUsers[0]} e ${likesUsers[1]}`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        else if(likesQuantity > 2) return <> <p data-tip= {`${likesUsers[0]}, ${likesUsers[1]} e ${likesUsers.length - 1} pessoas`} > {`${likesQuantity} likes`} </p> <ReactTooltip place="bottom" type="light"/> </>
        
    }


    function renderLikesQuantity(){
        return(
            <>
                {renderLikesTootip()}
            </>
        )
    }
    const toRenderLikesQuantity = renderLikesQuantity();

    return(
        <LikeBox> 
            {likeIcon}
            <NumberLikes>
                {toRenderLikesQuantity} 
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
