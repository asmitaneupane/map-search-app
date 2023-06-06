import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { useQueryClient, useQuery } from 'react-query';

const api_url = 'https://nominatim.openstreetmap.org/search?';

export default function Search({setSelectPosition}) {
  const [searchText, setSearchText] = useState('');

  const queryClient = useQueryClient();

  const fetchSearchResults = async (searchText) => {
    const params = {
      q: searchText,
      format: 'json',
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    const response = await fetch(`${api_url}${queryString}`, requestOptions);
    const data = await response.json();
    return data;
  };

  const {
    data: listPlace = [],
    isLoading,
    isError,
  } = useQuery(['search', searchText], () => fetchSearchResults(searchText), {
    enabled: !!searchText,
  });

  const handleSearch = () => {
    queryClient.invalidateQueries(['search', searchText]);
  };

  return (
    <div>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          placeholder="Search city"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            marginRight="5px"
            colorScheme="twitter"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <List spacing={3}>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error occurred while fetching data.</div>
        ) : (
          listPlace.map((item) => (
            <div key={item?.place_id}>
              <ListItem
                as="button"
                sx={{ textAlign: 'left', marginLeft: '10px' }}
                onClick={() => {
                  console.log(item);
                  setSelectPosition(item);
                }}
              >
                <ListIcon as={MdLocationOn} color="red.500" />
                {item?.display_name}
              </ListItem>
              <Divider />
            </div>
          ))
        )}
      </List>
    </div>
  );
}
