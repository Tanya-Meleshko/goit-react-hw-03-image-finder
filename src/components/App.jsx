import React, { Component } from 'react';
import Gallery from './Gallery/Gallery';
import SearchForm from './SearchForm/SearchForm';
import { fetchData } from 'fetchData';
import ScrollButton from './ScrollButton/ScrollButton';

export class App extends Component {
  state = {
    gallery: [],
    lastPage: false,
    isLoading: false,
  };

  searchQuery = '';
  page = 1;
  key = '30714189-c7a9caa64088584cf8591e191';

  onSubmit = query => {
    this.searchQuery = query;
    if (this.searchQuery.trim() !== '') {
      this.page = 1;
      this.setState({
        isLoading: true,
        gallery: [],
      });
      fetchData(this.key, this.searchQuery, this.page)
        .then(gallery => {
          if (this.page > gallery.totalHits / 12) {
            this.setState({
              lastPage: true,
            });
          } else {
            this.setState({
              lastPage: false,
            });
          }
          if (gallery.hits.length === 0) {
            this.setState({
              gallery: ['noimg'],
            });
          } else {
            this.setState({
              gallery: gallery.hits,
            });
          }
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  loadMore = () => {
    this.page += 1;
    this.setState({
      isLoading: true,
    });
    fetchData(this.key, this.searchQuery, this.page)
      .then(gallery => {
        if (this.page > gallery.totalHits / 12) {
          this.setState({
            lastPage: true,
          });
        }

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...gallery.hits],
        }));
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          this.addAutoScroll();
        }, 200);
      });
  };

  addAutoScroll = () => {
    const cardHeight = 500;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  render() {
    const { lastPage, isLoading, gallery } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <SearchForm onSubmit={this.onSubmit} />

        <Gallery
          isLastPage={lastPage}
          isLoading={isLoading}
          loadMore={this.loadMore}
          posts={gallery}
        />

        <ScrollButton />
      </div>
    );
  }
}
