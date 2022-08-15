import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import GlobalStyle from "../../styles/globalStyles";
import Like from "./Like.js";
import EditPost from "./EditPost";
import styled from "styled-components";
import axios from "axios"
import { BsTrash } from "react-icons/bs";
import ModalDelete from "./modalDelete";
import ReactHashtag from "@mdnm/react-hashtag";
import PublishPost from "./PublishPost";


export default function Post(props) {

  const [title, setTitle] = useState('');
  const [descrip, setDescrip] = useState('');
  const [image, setImage] = useState('');
  const [uri, setUri] = useState('');
  const [editing, setEditing]= useState(false);
  let {
      username,
      description,
      renderById,
      userId,
      url,
      imageProfile,
      idPost,
      getPost
  } = props
  function getMetadata() {
      const promise = axios.get(
          `http://localhost:4000/url-metadata?url=${url}`)
      promise.then(response => {
          setTitle(response.data.title)
          setDescrip(response.data.description)
          setImage(response.data.image)
          setUri(response.data.uri)
      })
  }
  
  useEffect(getMetadata, [])
  return (
      <>
      {editing? <PublishPost getPost={getPost} 
        postDescription ={description} 
        postUrl={uri} 
        editing ={editing} 
        setEditing= {setEditing} 
        postId = {idPost} 
        userId= {userId}/>
      :
        <Publication className="post">
            <ProfileImage>            
                <img src={imageProfile}/>
                <Like idPost ={idPost} />
            </ProfileImage>

            <ContainerPost>
                <EditPost userId ={userId} setEditing={setEditing} editing={false} top={'-10px'} />
                <h1 role='button' onClick={() => renderById(userId)} >{username}</h1>
                <h2>
                    <ReactHashtag 
                            renderHashtag={(hashtagValue) => {
                                return (
                                    <HashtagLink to={`/hashtag/${hashtagValue.slice(1)}`}>
                                    <Hashtag>{hashtagValue}</Hashtag>
                                    </HashtagLink>
                                )
                            }}>  
                        {description}
                    </ReactHashtag>
                </h2>

                <ContainerUrl onClick={() => window.open(uri)}>
                    <URLInfo>
                        <h1>{title}</h1>
                        <h2>{descrip}</h2>
                        <p>{uri}</p>
                    </URLInfo>
                    <URLImage>
                        <img src={image} alt=''/>
                    </URLImage>
                </ContainerUrl>
            </ContainerPost>
        </Publication>
       }
      </>
  )

}
const Publication = styled.div`
display: flex;
justify-content: space-between;
width: 40%;
height: auto;
margin: 40px auto;
background: #171717;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
position:relative;
`

const ProfileImage = styled.div`

img{
background-color : black;
width: 50px;
height: 50px;
border-radius: 50%;
margin: 1rem 1rem 0 1rem;
object-fit: cover;
}
`

const ContainerPost = styled.div`
position: relative;
font-family: 'Lato';
display: flex;
flex-direction: column;
width: 90%;
height: 100%;
border-radius: 16px;
margin-top: 20px;
margin-bottom: 20px;
h1:nth-child(2){
    cursor: pointer;
}

h1{
    font-size: 1.2rem;
    color: white;
    font-weight: 400;
}
h2{
    margin-top: 15px;
    font-size: 1.05rem;
    color: #B7B7B7;
    margin-bottom: 20px;
    text-align: justify;
    width: 95%;
    line-height: 22px;
}
`

const ContainerUrl = styled.div`
display: flex;
width: 95%;
height: 155px;
border: 1px solid #4D4D4D;
border-radius: 10px;

`

const URLInfo = styled.div`
    width: 60%;
    height: inherit;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
h1{
    font-size: 1rem;
}

h2{
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis; 
    color: #9B9595;
    line-height: 10px;
}

p{
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis; 
    color: white;
}


`

const URLImage = styled.div`
    width: 40%;
img{
    width: 100%;
    height: 100%;
    border-radius: 0 10px 10px 0;
}
`
const IconTrash = styled(BsTrash)`
color: white;
margin-right: 20px;
`
const DivDispl = styled.div`
display: flex;
justify-content: space-between;
`
const HashtagLink = styled(Link)`
text-decoration: none;
`

const Hashtag = styled.span`
color: #FFFFFF;
font-weight: 700;
:hover{
    cursor: pointer;
}
`;