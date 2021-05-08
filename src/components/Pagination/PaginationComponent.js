import {getTotalPages} from "../../utilities/PagingUtility";
import styles from './PaginationComponent.module.css';


const Pagination = (props) => {

    const {usersLength, setPage, page} = props;

    const totalPages = getTotalPages(usersLength);
    const changePage = (index)=> {
        setPage(index);
    }

    let pages = []

    for(let i = 1;i<=totalPages;i++) {

        pages.push(<div key={i} onClick={()=>changePage(i)} className={`${styles.page} ${page === i? styles.selected :''}`} >{i}</div>)

    }
    return (
        <div className={styles.pagination}>
            {
                pages
                }
        </div>
    )
}

export default Pagination;