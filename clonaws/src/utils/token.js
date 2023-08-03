

import {Token} from "./constants";
import jwtDecode from "jwt-decode";


export function setToken(token){
    localStorage.setItem("Token", token)
}

export function getToken(){
  return localStorage.getItem("Token")
}

export function removeToken(){
   localStorage.removeItem("Token")
}

export function decodeToken(token){

  return jwtDecode(token)
}


