import GalleryItem from 'components/GalleryItem/GalleryItem';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import React, { Component } from 'react';
import s from './Gallery.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default class Gallery extends Component {
  render() {
    const { posts, isLoading, isLastPage } = this.props;

    return (
      <>
        {posts.length === 1 ? (
          <h2 className={s.errorMessage}>
            There are no images for this search.
          </h2>
        ) : (
          <ul className={s.galleryList}>
            {posts.map(({ id, webformatURL, largeImageURL }) => (
              <li key={id} className={s.galleryCard}>
                <GalleryItem
                  smallImage={webformatURL}
                  bigImage={largeImageURL}
                />
              </li>
            ))}
          </ul>
        )}

        {isLoading ? (
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          posts.length !== 0 &&
          !isLastPage && <LoadMoreButton loadMore={this.props.loadMore} />
        )}
      </>
    );
  }
}
