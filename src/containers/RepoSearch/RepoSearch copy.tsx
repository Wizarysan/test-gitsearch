import React, { useState, useRef } from "react"
import styled from 'styled-components';

import { githubApiSearchRepo, githubToken } from "../../constants/api"

import Repository from "../../components/Repository";
import { IRepoProps } from "../../components/Repository/Repository";
import Paginator from "../../components/Paginator";
import SearchBar from "../../components/SearchBar";

const StyledRepos = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const MemStyledRepos = React.memo(StyledRepos)

const RepoSearch = () => {
    const [query, setQuery] = useState("")
    const [repos, setRepos] = useState<[IRepoProps] | null>(null)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const throttling = useRef(false)

    const handleThrottleRequest = (e: any) => {
        if (throttling.current || query.length === 0 || e.target.classList.contains('active')) {
            return
          }
      
          throttling.current = true
          setLoading(true)
          
          setTimeout(() => {            
            throttling.current = false
            if(!e.target.classList.contains('js-pagelink')) setPages(0)            
            //TODO https://dmitripavlutin.com/javascript-fetch-async-await/
            fetch(`${githubApiSearchRepo}?q=${query}&page=${e.target.dataset.page}&sort=stars&order=desc&per_page=100`, {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    Accept: "application/vnd.github+json"
                  },
            })
            .then(async response => {
                if (!response.ok) {
                    console.log("Something went wrong!")
                } else {
                    const data = await response.json()
                    const pagesCount = Math.floor(data.total_count/100)
                    setRepos(data.items.map((item: any) => ({
                        name: item.name,
                        url: item.svn_url, 
                        owner: item.owner.login, 
                        stars: item.stargazers_count
                    })))
                    // Github API returns message: "Only the first 1000 search results are available"
                    // So we must limit paginaiton by 100 items * 10 pages                  
                    setPages(pagesCount > 10 ? 10 : pagesCount)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.error(err)
            })
          }, 100)
    }

    return <>
          <SearchBar query={query} setQuery={setQuery} handleSearch={handleThrottleRequest} />
          {pages > 0 && <Paginator pages={pages} apiCallback={handleThrottleRequest} />}
            <MemStyledRepos>
                {loading ? <span style={{marginLeft: 15}}>Loading...</span> : repos?.map(repo=><Repository {...repo} key={repo.name} />)}
            </MemStyledRepos>            
        </>
}


export default RepoSearch