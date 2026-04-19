import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { heroes as initialHeroes } from '../../../data/heroes';

interface Hero {
  hero: {
    id: number;
    name: { first: string; last: string };
    date: { birth: string; dead: string };
    region: string;
    war: string;
    img_url: string;
    bio_link: string;
    bio: string;
  };
  onClick: () => void;
  index: number;
}

interface HeroesState {
  list: Hero[];
  filteredList: Hero[];
  selectedHero: Hero | null;
  searchQuery: string;
  favorites: number[];
}

const initialState: HeroesState = {
  list: initialHeroes,
  filteredList: initialHeroes,
  selectedHero: null,
  searchQuery: '',
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredList = state.list.filter(hero =>
        hero.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        hero.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    selectHero: (state, action: PayloadAction<number>) => {
      state.selectedHero = state.list.find(h => h.id === action.payload) || null;
    },
    clearSelectedHero: (state) => {
      state.selectedHero = null;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.filteredList = state.list;
    },
  },
});

export const { setSearchQuery, selectHero, clearSelectedHero, toggleFavorite, resetFilters } = heroesSlice.actions;
export default heroesSlice.reducer;