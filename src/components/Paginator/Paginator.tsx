import { useState } from "react"
import styled from 'styled-components';

const Paginator: React.FC<IPaginatorProps> = ({pages, apiCallback, className}: IPaginatorProps) => {
    const [currentPage, setcurrentPage] = useState(1)
    let pageElements = []

    const handlePageChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement
        if(!target.dataset.page) return
        apiCallback(e)
        setcurrentPage(parseInt(target.dataset.page))
    }

    for(let i=1; i<=pages; i++) {
        pageElements.push(<span key={`pageel-${i}`} data-page={i} className={`js-pagelink ${currentPage === i ? 'active' : ''}`}>{i}</span>)
    }

    return <div onClick={handlePageChange} className={className}>
        {pageElements}
    </div>
}

const StyledPaginator = styled(Paginator)`
    padding: 10px;
    
    & span {
        cursor: pointer;
        margin: 0 5px;
        &.active {
            font-weight: bold;
        }
    }
`

export interface IPaginatorProps {
    pages: number,
    apiCallback: (e: (React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>)) => void,
    className?: string
}

export default StyledPaginator