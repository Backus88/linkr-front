import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import {DebounceInput} from 'react-debounce-input';
import { useState } from 'react';
import Dropdown from './Dropdown';

export default function SearchBar(){
    const [searchUser, setSearchUser] = useState('');
    const [searching, setSearching]= useState(false);
    const [querieController, setQuerieController] = useState(false);

    function searchOnChange(event){
        event.preventDefault();
        console.log('nao faz nada ainda');
    }
    return(
        <SearchContainer>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    placeholder = "Search for people"
                    type="string"
                    // value = {searchUser}
                    onChange={(event)=> {
                        setSearchUser(event.target.value);
                        if(event.target.value.length >= 3){
                            setSearching(true);
                            setQuerieController(!querieController);
                        }else{
                            setSearching(false)
                        }
                        return
                    }}
                />
            <SearchIcon onClick={searchOnChange}/>
            {
                (searching?<Dropdown usernameString = {searchUser}
                                     querieController ={querieController}
                                     searching = {searching} 
                                     setSearching={setSearching}/>:null)   
            }
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    z-index: 2;
    position: relative;
    box-sizing: border-box;
    min-width: 500px;
    height: 50px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Lato';
    padding: 5px;
    &:hover {
        box-shadow: 1px 1px 1px thistle;
    }
    input{
        z-index: 2;
        flex: 1 1 50px;
        background-color: transparent;
        padding-left: 5px;
        border: none;
        font-size: inherit;
        &:focus{
            outline: none;
        }
    }
`;

const SearchIcon = styled(AiOutlineSearch)`
    color: #C6C6C6;
    width: 21px;
    height: 21px;
    cursor: pointer;
`;