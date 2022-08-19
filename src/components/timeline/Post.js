import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import GlobalStyle from "../../styles/globalStyles";

import styled from "styled-components";
import axios from "axios"
import ReactHashtag from "@mdnm/react-hashtag";

import { BsTrash } from "react-icons/bs";
import {BiRepost} from "react-icons/bi"

import Like from "./Like.js";
import EditPost from "./EditPost";
import ModalDelete from "./modalDelete";
import PublishPost from "./PublishPost";
import Comments from "./Comments";
import Repost from "./Repost";
import CommentImg from "./CommentImg";




export default function Post(props) {

  const [title, setTitle] = useState('');
  const [descrip, setDescrip] = useState('');
  const [image, setImage] = useState('');
  const [uri, setUri] = useState('');
  const [editing, setEditing]= useState(false);
  const [visible, setVisible] = useState(false);
  const localId = localStorage.getItem("id");
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const URI = process.env.REACT_APP_DATABASE_URI
  const [writeComm, setWriteComm] = useState(false)

  let {
      username,
      description,
      renderById,
      userId,
      url,
      imageProfile,
      idPost,
      getPost,
      repostUsername,
      repostCount,
      hashtagController,
      setHashtagController
  } = props
  function getMetadata() {
      const promise = axios.get(
          `${URI}/url-metadata?url=${url}`)
      promise.then(response => {
          setTitle(response.data.title)
          setDescrip(response.data.description)
          setImage(response.data.image)
          setUri(response.data.uri)
      })
    }

    console.log(repostUsername);
    console.log(repostCount);
    useEffect(()=>{
    if(parseInt(localId)===parseInt(userId)&& userId){
        setDeleteIcon(true);
        }
    },[userId])

  useEffect(getMetadata, [])

 

  return (
      <>
      {editing? <PublishPost getPost={getPost} 
        postDescription = {description} 
        postUrl={uri} 
        editing ={editing} 
        setEditing = {setEditing} 
        postId = {idPost} 
        userId= {userId}
        hashtagController={hashtagController} 
        setHashtagController={setHashtagController}/>
      :
              <PostPage>
                {repostCount > 0?
                  <RepostedByYou>
                      <Icon></Icon>
                      <h1>Re-posted by <b>{repostUsername}</b></h1>
                  </RepostedByYou>
                :null}
                  <ColumnDiv>
                      <Publication className="post">
                          <ProfileImage>
                              <img src={imageProfile}/>
                              <Like idPost={idPost} />
                              <CommentImg onClick={!setWriteComm} commentCount={commentCount} showComments={showComments} setShowComments={setShowComments} />
                              <Repost userId={userId}
                               postId={idPost} 
                               getPost={getPost} 
                               hashtagController={hashtagController} 
                               setHashtagController={setHashtagController}
                               repostCount={repostCount}
                               repostUsername={repostUsername} />
                          </ProfileImage>
                          <ModalDelete visible={visible} setVisible={setVisible} postId={idPost} getPost={getPost} hashtagController={hashtagController}
                              setHashtagController={setHashtagController}
                          />
                          <ContainerPost>
                              <DivDispl>
                                  <EditPost userId={userId} setEditing={setEditing} editing={false} top={'-10px'} />
                                  <h1 role='button' onClick={() => renderById(userId)} >{username}</h1>
                                  {deleteIcon ? <IconTrash userId={userId} onClick={() => setVisible(true)} /> : null}
                              </DivDispl>
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
                                      <img src={image} alt='' />
                                  </URLImage>
                              </ContainerUrl>
                          </ContainerPost>
                      </Publication>
                      <Comments userId={userId} postId={idPost} setCommentCount ={setCommentCount} showComments={showComments} />
                  </ColumnDiv>
              </PostPage>
       }
      </>
  )

}

const PostPage = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    margin: 100px 0;
`

const RepostedByYou = styled.div`
position: absolute;
z-index:-1;
top: -30px;
width: 100%;
height: 60px;
background-color: #1E1E1E;
font-family: 'Lato';
border-radius: 16px 16px 0 0;
padding: 6px 0 6px 12px;
display: flex;

h1{
    color:white;
    font-weight: 700;
    font-size: 11px;
    margin-top: 3px;
}
`

const Icon = styled(BiRepost)`
    width: 30px;
    height: 24px;
    margin-right: 4px;
    margin-top: -2px;
    color: white;
`

const Publication = styled.div`
display: flex;
justify-content: space-between;
max-width: 560px;
width: 100%;
height: auto;
background: #171717;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
position: relative;
`

const ColumnDiv = styled.div`
display: flex;
flex-direction: column;
height: auto;
width: 100%;
background-color: #1E1E1E;
margin: 40px auto;
border-radius: 8px;

`

const ProfileImage = styled.div`
display: flex;
flex-direction: column;

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
cursor: pointer;
`
const DivDispl = styled.div`
display: flex;
justify-content: space-between;
h1{
    cursor: pointer;
}
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
`
