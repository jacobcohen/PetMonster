import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'

export const Sidebar = ({ categories }) => {

    return (    
        <sidebar className="col-lg-2">
            <h3>Monsters</h3>
            <ul id="categories">
                <li><Link to={`/`}>All</Link></li>
            {
                categories.all && categories.all.map(category => 
                    (
                        <li key={ category.id }>
                            <Link  to={`/products/category/${category.id}`}>
                                {category.name}
                            </Link>
                        </li>
                    )
                )
            }
            </ul>
            <hr />
        </sidebar>
    )
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(mapStateToProps)(Sidebar)
