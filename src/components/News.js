import React, {useEffect,useState } from 'react'

import NewItems from './NewItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
 

const News=(props)=> {
    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(true);
    const [page,setPage]=useState(1)
    const [totalResult ,setTotalResult]=useState(0)
  
        document.title = ` ${props.category}+ NewsMonkey `;
    

   const capataliseFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+String.slice(1);

    }
    const updateNews=async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`
        setLoading(true);

        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        // setArticles(parsedData.articles);
        // setTotalResults(parsedData.totalResults),
        // setLoading(false)
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        setLoading(true)
        props.setProgress(100);
    }
   useEffect(()=>{updateNews()},[])
   const handlePrevClick = async () => {
        console.log("Clicked on previous button");
      
      
            // setPage (page - 1),
            setPage(page-1);
        updateNews();
    }

    const handleNextClick = async () => {
        console.log("Clicked on next button")
        // setPage(page+1),
        setPage(page+1);
        updateNews();
    }
    const fetchMoreData = async () => {
    
        console.log("Clicked on previous button")
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page+1);//as this funciton is asychronous , it will take some time and berfore that the url string is resolved for that we mannually add page plus 1 in url ELSE if the set page is page is not mannuall incrimented and the is writen above the url then by the time the page
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        
        setArticles(articles.concat(parsedData.articles))
            // setArticles(articles.concat(parsedData.articles)),
           setLoading(true)
           setTotalResult(parsedData.totalResults)
    
    };


    
        return (
            <>
                {/* <div className="container my-3"> */}

                <h1 className="text-center" style={{margin:'35px 8px', marginTop:'90px'}}>NewsMonk-top headlines from  {props.category}</h1>

                {/* {state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">

                            {/*!state.loading && */articles.map((elements) => {
                                return <div className="col-md-4" key={elements.url}>
                                            <NewItems  url={elements.url} title={elements.title} description={elements.description} imageUrl={elements.urlToImage} author={elements.date} date={elements.publishedAt} source={elements.source.name} />
                                        </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>

                {/* </div> */}
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={state.page <= 1} type="button" className="btn btn-outline-dark mx-3" onClick={handlePrevClick}>&larr;Previos</button>
                    <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-outline-dark mx-3" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            */}

            </>
        )
    
}

export default News

//deault props and default props are used at the end of the components
News.defaultProps = {
    country: "in",
    pageSize: 11,
    category: "general",
}
 News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    setProgress: PropTypes.func
}