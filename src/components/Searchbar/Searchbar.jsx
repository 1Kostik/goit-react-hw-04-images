import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Search,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';

export function Searchbar({ onSubmit }) {
  const [name,setName]=useState('')

 const hendlerOnChange = event => {
    setName(event.target.value.toLowerCase());
  };
 const hendlerOnSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Bведите название поиска');
      return;
    }
   onSubmit(name);
    setName('');
  };

    return (
      <>
        <Search>
          <SearchForm onSubmit={hendlerOnSubmit}>
            <IconContext.Provider
              value={{ style: { color: 'black', width: '2em', height: '2em' } }}
            >
              <SearchFormButton type="submit">
                <FiSearch />
                <SearchFormButtonLabel>Search</SearchFormButtonLabel>
              </SearchFormButton>
            </IconContext.Provider>
            <SearchFormInput
              value={name}
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={hendlerOnChange}
            />
          </SearchForm>
        </Search>
      </>
    );
  
}
Searchbar.propTypes = { onSubmit: PropTypes.func };
