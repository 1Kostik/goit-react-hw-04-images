import { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { ImageGalleryList, Text } from './ImageGallery.styled';
import { Searchbar } from '../Searchbar/Searchbar';

export function ImageGallery() {
  const [query, setQuery] = useState('');
  const [findItems, setFindItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    const getPhotos = async () => {
      const currentPage = page;
      const per_page = 12;
      try {
        const { hits, totalHits } = await fetchItems(query, page);
        if (hits.length === 0) {
          return;
        }
        setFindItems(findItems => [...findItems, ...hits]);
        setIsShowButton(currentPage < Math.ceil(totalHits / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
      return;
    };

    getPhotos();
  }, [query, page]);

  const handlerSubmit = name => {
    setQuery(name);
    setFindItems([]);
    setPage(1);
    setIsShowButton(false);
  };
  const handlerOnClick = () => {
    setPage(page => page + 1);
  };

  const isShowImages = findItems.length > 0;
  return (
    <>
      <Searchbar onSubmit={handlerSubmit} />
      {isLoading && <Loader />}
      {isShowImages && (
        <ImageGalleryList>
          {findItems &&
            findItems.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
        </ImageGalleryList>
      )}
      {isShowButton && <Button onClick={handlerOnClick} />}
      {error && <Text textAlign="center">{error}</Text>}
    </>
  );
}
