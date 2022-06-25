import Reac from 'react'

const NewItems = (props) => {



    let { title, description, imageUrl, url, author, date, source } = props;//the destructuring of the array is done both class and funcitonal based components
    return (
        <div className="my-3">
            <div className="card" >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                    {source}
                </span>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}
                    </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={url} target="_blank" className="btn  btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewItems
