import React from "react";
import GuidLines from '../GuidLines.jsx';
import PortfolioGallery from './PortfolioGallery.jsx';
import PortolioDescription from './PortolioDescription.jsx';
import GalleryReview from '../GalleryReview/GalleryReview.jsx';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import './Portfolio.less';

import Waypoint from 'react-waypoint';

class Portfolio extends React.Component {

    state = {
        filter: 'all',
        projects: this.props.projects,
        galleryReviewOn: false,
        galleryElementIndex: 0
    };

    handlerSortPortfolio = (e) => {
        const sortCategory = e.target.dataset.category;
        let sortProjects;

        if(sortCategory === 'all') {
            sortProjects = this.props.projects;
        } else {
            sortProjects = this.props.projects.filter(project => {
                return project.category === sortCategory;
            });
        }

        this.setState({
            filter: sortCategory,
            projects: sortProjects
        });
    };

    handlerClickCloseReview = () => {
        this.setState({
            galleryReviewOn: false
        });
    };

    handlerClickGalleryItem = (e) => {
        let elementIndex = e.currentTarget.getAttribute('data-index');
        elementIndex = parseInt(elementIndex, 10);

        this.setState({
            galleryElementIndex: elementIndex,
            galleryReviewOn: true
        });
    };

    render() {
        let galleryReview = null;
        if (this.state.galleryReviewOn) {
            let galleryReviewSettings = {
                onClickCloseReview: this.handlerClickCloseReview,
                projects: this.props.projects,
                initialSlide: this.state.galleryElementIndex
            };
            galleryReview = <GalleryReview {...galleryReviewSettings} />
        }

        return (
            <section className="section portfolio">
                <div className="portfolio__body">
                    <PortolioDescription
                        projects={this.props.projects}
                        description={this.props.categoryDescription}
                        filter={this.state.filter}
                        onClickSortPortfolio={this.handlerSortPortfolio}
                    />
                    
                    <PortfolioGallery 
                        projects={this.state.projects}
                        onClickGalleryItem={this.handlerClickGalleryItem}
                    />
                </div>
                <div className={`mask ${(this.state.galleryReviewOn) ? 'mask--gallery-review' : ''}`}>
                    <CSSTransitionGroup
                        transitionName="gallery-review-transition"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={200}
                    >
                        {galleryReview}
                    </CSSTransitionGroup>
                </div>

                <GuidLines
                    colorScheme={this.props.colorScheme}
                    disableLines={[5]}
                />
                <div className="waypoint waypoint--portfolio">
                    <Waypoint onEnter={this.props.onChangeSection.bind(this, 'portfolio')} />
                </div>
            </section>
        )
    }
}

export default Portfolio;