import styled from 'styled-components';

const SearchBar: React.FC<IRepoProps> = ({query, setQuery, handleSearch, className}: IRepoProps) => {
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
        if (e.key === 'Enter') {            
            handleSearch(e);
        }
    };

    return <div className={className}>
        <input type="text"
            data-page="1" 
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(e)}/>
        <button data-page="1" onClick={handleSearch}>
            search 
        </button>
    </div>
}

const StyledSearchBar = styled(SearchBar)`
    padding: 10px;    
    & input {
        padding: 5px 10px;
        vertical-align: middle;
        border: 2px solid black;
    }
    & button {
        padding: 6px 10px;
        margin-left: 10px;
        vertical-align: middle;
        font-size: 16px;
        line-height: 1;
        background: #f6f8fa;
        border-color: #1b1f2426;
        border-radius: 5px;
    }
`

export interface IRepoProps {
    query: string
    setQuery: (value: string) => void
    handleSearch: (e: (React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>)) => void
    className?: string
}

export default StyledSearchBar