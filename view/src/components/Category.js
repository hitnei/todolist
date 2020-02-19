import React, { Component } from 'react'
import './Category.css'

export default class Category extends Component {
    render() {
        return (
            <div className="category">
                <div className="category-top">
                    <div className="category-item__top">
                        <img className="category-image" src="/images/plus-solid.svg" alt="plus"/>
                        <input className="category-button category-create__new" type="button" value='Create New'/>
                    </div>
                    <div className="category-item">
                        <img className="category-image" src="/images/sticky-note-solid.svg" alt="plus"/>
                        <input className="category-button category-all__note" type="button" value='All Notes'/>
                        <span>10</span>
                    </div>
                    <div className="">
                        <img className="category-image" src="/images/tags-solid.svg" alt="tags-solid"/>
                        <input className="category-button category-category" type="button" value='Category'/>
                    </div>
                    {/*  */}
                    <div className="">
                        <div className="category-item">
                            <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid"/>
                            <input className="category-button category-button__categories category-category" type="button" value='Category-01'/>
                            <span>10</span>
                        </div>
                        <div className="category-item">
                            <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid"/>
                            <input className="category-button category-button__categories category-category" type="button" value='Category-02'/>
                            <span>10</span>
                        </div>
                        <div className="category-item">
                            <img className="category-image__categories" src="/images/tag-category.svg" alt="tags-solid"/>
                            <input className="category-button category-button__categories category-category" type="button" value='Category-03'/>
                            <span>10</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className="category-item">
                        <img className="category-image" src="/images/paperclip-solid.svg" alt="paperclip-solid"/>
                        <input className="category-button category-clip" type="button" value='Clip'/>
                        <span>10</span>
                    </div>
                </div>
                <div>
                    <div className="">
                        <img className="category-image__delete" src="/images/delete.svg" alt="delete"/>
                        <input className="category-button category-clip" type="button" value='Delete'/>
                    </div>
                </div>
            </div>
        )
    }
}
