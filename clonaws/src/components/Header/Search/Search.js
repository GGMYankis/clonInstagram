import React,{useState, useEffect} from 'react'
import {Search as SearchSU, Image} from "semantic-ui-react";
import {SEARCH} from "../../../gql/user"
import { useQuery } from '@apollo/client';
import {size} from "lodash";
import ImageNoFound from '../../../assets/png/avatar (1).png';
import {Link} from "react-router-dom";
import "./Search.css"


function Search() {

    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([]);
    
    const {data, loading} = useQuery(SEARCH,{
        variables:{
        search
        }
    });


    useEffect(() => {

        if(size(data?.search) > 0){

            const users = [];
            data.search.forEach((user, index) => {

                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar,
                });
                setResults(users);

            });


        }else{
            setResults([]);
        }
    },[data])

   const onChage = (e) => {

     if(e.target.value) setSearch(e.target.value);
     else setSearch(null)
    
   }
   
  return (

    <SearchSU className='search-users' 
      fluid 
      loading={loading}
      input={{icon:"search"}}
      onSearchChange={onChage}
      value={search || ""}
      results={results}
      resultRenderer={(e) => <ResultSearch data={e}/>}
    />
      
  )

}

export default Search


function ResultSearch(props){
    const {data} = props;

    return (
        <Link className="search-users-item" to={`/${data.username}`}>
            <Image src={data.avatar || ImageNoFound} className='imfs'/>
            <p>{data.title}</p>
            <p>{data.username}</p>
        </Link>
    )
}