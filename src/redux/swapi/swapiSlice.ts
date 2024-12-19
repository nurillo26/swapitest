import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface EntityState {
  data: any;
  loading: boolean;
  error: string | null;
  page: number;
  count: number;
}

export interface SwapiState {
  people: EntityState;
  planets: EntityState;
  starships: EntityState;
}

export const swapiFetchData = createAsyncThunk(
  'swapi/FetchData',
  async ({ entity, page }: { entity: keyof SwapiState; page: number }) => {
    try {
      // const { data } = await axios.get(`https://swapi.dev/api/${entity}/?page=${page}`);
      const { data } = await axios.get(`https://swapi.py4e.com/api/${entity}/?page=${page}`);

      return { entity, data };
    } catch (error: any) {
      throw error;
    }
  },
);

const initialState: SwapiState = {
  people: { data: {}, loading: false, error: null, page: 1, count: 0 },
  planets: { data: {}, loading: false, error: null, page: 1, count: 0 },
  starships: { data: {}, loading: false, error: null, page: 1, count: 0 },
};

const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<{ entity: keyof SwapiState; page: number }>) {
      const { entity, page } = action.payload;
      state[entity].page = page;
    },
    updateEntityData(state, action: PayloadAction<{ entity: keyof SwapiState; updData: any }>) {
      const { entity, updData } = action.payload;
      const page = state[entity].page;

      if (Array.isArray(state[entity].data[page])) {
        const index = state[entity].data[page].findIndex((item) => item.url === updData.url);

        if (index !== -1) {
          state[entity].data[page][index] = { ...state[entity].data[page][index], ...updData };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(swapiFetchData.pending, (state, action) => {
      const { entity } = action.meta.arg;
      state[entity].loading = true;
      state[entity].error = null;
    });
    builder.addCase(swapiFetchData.fulfilled, (state, action) => {
      const { entity, data } = action.payload;
      const page = action.meta.arg.page;

      state[entity].loading = false;

      if (!state[entity].data[page]) {
        state[entity].data[page] = data.results;
      }

      state[entity].count = data.count;
    });
    builder.addCase(swapiFetchData.rejected, (state, action) => {
      const { entity } = action.meta.arg;
      state[entity].loading = false;
      state[entity].error = 'Ошибка получения данных';
    });
  },
});

export const { setPage, updateEntityData } = swapiSlice.actions;

export default swapiSlice.reducer;
