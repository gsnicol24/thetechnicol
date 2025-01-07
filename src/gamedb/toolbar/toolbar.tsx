import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { PlusLg } from 'react-bootstrap-icons';
import AddGameModal from '../add-game-modal/add-game-modal';
import firebase from 'firebase/compat/app';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import FilterModal from '../filter-modal/filter-modal';
import { FilterQuery } from '../models/filter';
import React from 'react';

function GameDBToolbar(props: {
    User: firebase.User | undefined,
    setFilterQuery: React.Dispatch<React.SetStateAction<FilterQuery | undefined>>,
    minPlaytime: number,
    maxPlaytime: number;
    genres: string[];
}) {

    const [searchText, setSearchText] = useState<string | undefined>()
    const [filterQuery, setFilterQuery] = useState<FilterQuery | undefined>(undefined)

    const updateSearchText = (searchText: string) => {
        setSearchText(searchText);
        const query = getFilterQuery()
        query.searchText = searchText;
        updateFilterQuery(query);
    }

    const getFilterQuery = () => {
        if (!filterQuery) {
            return {} as FilterQuery
        }
        return filterQuery
    }

    const updateFilterQuery = (query: FilterQuery) => {
        setFilterQuery(query);
        props.setFilterQuery(query)
    }

    const updateQueryWithExistingSearchText = (query: Partial<FilterQuery>) => {
        updateFilterQuery(
            {
                searchText,
                players: query.players,
                playtime: query.playtime,
                genres: query.genres
            }
        )
    }

    const setPlayers = (players: number | undefined) => {
        const query = getFilterQuery()
        query.players = players;
        updateFilterQuery(query);
    }

    const setPlaytime = (playtime: number | undefined) => {
        const query = getFilterQuery()
        query.playtime = playtime;
        updateFilterQuery(query);
    }

    const updateGenres = (genres: string[] | undefined) => {
        const query = getFilterQuery()
        query.genres = genres;
        updateFilterQuery(query);
    }

    return (
        <React.Fragment>
            <Navbar bg="light" expand={true} fixed="top">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Text>
                        Signed in as: <span style={{ color: 'black' }}>{props.User?.displayName}</span>
                    </Navbar.Text>
                    <Navbar.Collapse className="justify-content-end">

                        <Nav>
                            <span style={{ marginRight: 16 }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                    value={searchText}
                                    onChange={e => updateSearchText(e.target.value)}
                                />
                            </span>
                            <FilterModal
                                minPlaytime={props.minPlaytime}
                                maxPlaytime={props.maxPlaytime}
                                genres={props.genres}
                                updatePlayerCountFilter={setPlayers}
                                updatePlaytimeFilter={setPlaytime}
                                updateGenres={updateGenres}
                                updateFilter={updateQueryWithExistingSearchText} />
                            <span style={{ marginRight: 8 }} />
                            <AddGameModal />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default GameDBToolbar