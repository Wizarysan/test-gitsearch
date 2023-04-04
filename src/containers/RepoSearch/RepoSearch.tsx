import React, { useState, useRef, useMemo } from "react"
import styled from 'styled-components';

import Repository from "../../components/Repository";
import Paginator from "../../components/Paginator";
import SearchBar from "../../components/SearchBar";
import { IRepoProps } from "../../components/Repository/Repository";

import fetchRepositories from "../../api/fetchRepositories";
import { THROTTLE_DELAY } from "../../constants/api";

const StyledRepos = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const RepoSearch = () => {
    const [query, setQuery] = useState("")
    const [repos, setRepos] = useState<[IRepoProps] | null>(null)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const throttling = useRef(false)

    const memoizedRepos = useMemo(()=>repos?.map(repo=><Repository {...repo} key={`${repo.name}-${repo.owner}`} />), [repos])

    const handleThrottleRequest = (e: (React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>)) => {
        const target = e.target as HTMLElement
        if (throttling.current || query.length === 0 || target.classList.contains('active')) {
            return
        }
      
        throttling.current = true
        setLoading(true)
          
        setTimeout(() => {            
            throttling.current = false
            if(!target.classList.contains('js-pagelink')) setPages(0)
            fetchRepositories(query, target.dataset.page)
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
        }, THROTTLE_DELAY)
    }

    return <>
          <SearchBar query={query} setQuery={setQuery} handleSearch={handleThrottleRequest} />
          {pages > 0 && <Paginator pages={pages} apiCallback={handleThrottleRequest} />}
            <StyledRepos>
                {loading ? <span style={{marginLeft: 15}}>Loading...</span> : memoizedRepos}
            </StyledRepos>            
        </>
}


export default RepoSearch