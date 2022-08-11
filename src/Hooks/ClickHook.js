import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function useOutsideAlerter(ref, setModal) {

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementById('menu').hidden = true
        setModal(false)
      }
      
      if(!ref.current && ref.current.contains(event.target)){
        document.getElementById('menu').hidden = false
        setModal(true)
      }

    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}