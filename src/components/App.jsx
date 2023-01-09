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
    page: 1,
    searchQuery: '',
  };

  key = '30714189-c7a9caa64088584cf8591e191';

  componentDidUpdate(_, prevState) {
    if (
      prevState.page === this.state.page &&
      prevState.searchQuery === this.state.searchQuery
    ) {
      return;
    }
    fetchData(this.key, this.state.searchQuery, this.state.page)
      .then(gallery => {
        if (this.state.page > gallery.totalHits / 12) {
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
          if (this.state.gallery.length === 0) {
            this.setState({
              gallery: gallery.hits,
            });
          } else {
            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...gallery.hits],
            }));
          }
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
        if (this.state.gallery.length !== 0) {
          this.addAutoScroll();
        }
      });
  }

  onSubmit = query => {
    this.setState({ searchQuery: query });
    if (this.state.searchQuery.trim() !== '') {
      this.setState({ page: 1 });
      this.setState({
        isLoading: true,
        gallery: [],
      });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.setState({
      isLoading: true,
    });
  };

  addAutoScroll = () => {
    setTimeout(() => {
      const cardHeight = 500;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 200);
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
