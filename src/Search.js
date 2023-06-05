import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";

const api_url = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function Search({ selectPosition, setSelectPosition }) {
  const [searchText, setSearchText] = useState();
  console.log(searchText);
  const [listPlace, setListPlace] = useState([]);

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
          //   value={city}
          //   onChange={(e) => setCity(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            marginRight="5px"
            colorScheme="twitter"
            onClick={() => {
              //search
              const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${api_url}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.error("err:", err));
            }}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <List spacing={3}>
        {listPlace.map((item) => {
          return (
            <div key={item?.place_id}>
              <ListItem
                as="button"
                sx={{ textAlign: "left", marginLeft: "10px" }}
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                <ListIcon as={MdLocationOn} color="red.500" />
                {item?.display_name}
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
}
