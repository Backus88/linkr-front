import axios from "axios";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Follow(props){

    const URI = process.env.REACT_APP_DATABASE_URI

    let {
        followedId,
        config
    } = props;

    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getFollow(){
        setLoading(true)
        try {

            const response = await axios.get(`${URI}/follows/${followedId}`, config);
            handleSucess(response);

        } catch (error) {
            handleError(error);
        }
    }

    function handleSucess(res){
        console.log(res.data);
        setIsFollowing(res.data.isFollower);
        setLoading(false);
    };

    function handleError(err){
        setLoading(true);
        const message = `Please try again: ${err.response.data}`
        alert(message);
    }

    useEffect(()=>{
        getFollow()
    }, []);
    
    async function followUser(){
        
        try {
          await axios.post(`${URI}/follows/${followedId}`,'', config);
          getFollow();
          
        } catch (error) {
            handleError(error);
        }  
    }

    async function unfollowUser(){
        
        try {
            await axios.delete(`${URI}/follows/${followedId}`, config);
            getFollow();
            
          } catch (error) {
            handleError(error);
          }
    }
    
    function changeFollow(){
        setLoading(true);
        if(isFollowing) unfollowUser(); 
        else followUser(); 
    }

    return(
        <>
        <FollowButton follow={isFollowing} onClick={changeFollow} disabled={loading}> 
            {loading? <IconLoading/> :
                        isFollowing? <p> Unfollow </p> : <p> Follow</p>
            }
        </FollowButton> 
        </>
    )
};


const FollowButton = styled.button`
width: 112px;
height: 31px;

position: absolute;
top: 163px;

background-color: ${props => props.follow ? '#FFFFFF' : '#1877F2'};
border-radius: 5px;
border: none;
:hover{
    cursor:pointer;
}

:disabled{
border: 1px solid #999999;
background-color: #cccccc;
color: #666666;
cursor: default;
}

p{
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;

color: ${props => props.follow ? '#1877F2' : '#FFFFFF'};
} `;

const IconLoading = styled(AiOutlineLoading3Quarters)`
color: #FFFFFF;
width: 90%;
height: 90%;
align-self: center;
`