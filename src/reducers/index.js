const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter(elem => elem === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED': 
            const newHeroesList = state.heroes.filter(hero => hero.id !== action.payload);
            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: state.activeFilter === 'all' ? newHeroesList : newHeroesList.filter(elem => elem.element === state.activeFilter)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'HERO_ADDED':
            const newHeroArray = [...state.heroes, {id: action.payload.id, name: action.payload.name, description: action.payload.description, element: action.payload.element }]
            return {
                ...state,
                heroes: newHeroArray,
                filteredHeroes: state.activeFilter === 'all' ? newHeroArray : newHeroArray.filter(elem => elem.element === state.activeFilter)
            }
        case 'FILTER_CHANGED':
            const filteredHeroes = [...state.heroes.filter(elem => elem.element === action.payload)];
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? state.heroes : filteredHeroes
            }
        default: return state
    }
}

export default reducer;