import styled from 'styled-components';
import starIcon from '../../assets/star.svg'

const Repository: React.FC<IRepoProps> = ({name, url, owner, stars, className}: IRepoProps) => <div className={className}>
    <a href={url} target="_blank">{name}</a> by {owner} 
    <div><img src={starIcon} className="star_icon" alt="star" /> {stars}</div>
</div>

const StyledRepository = styled(Repository)`
    border: 1px solid #d0d7de;
    border-radius: 10px;
    margin: 10px;
    padding: 10px 15px;
    
    & .star_icon {
        width: 13px;
    }
`

export interface IRepoProps {
    name: string, 
    url: string, 
    owner: string, 
    stars: number,
    className?: string
}

export default StyledRepository