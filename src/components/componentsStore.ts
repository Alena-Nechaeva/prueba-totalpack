import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { TUserData, TUserDireccion } from '@/api/api.types';

type TInitialState = {
  isUserModalOpen: boolean;
  isEditMode: boolean;
  currentUser: TUserData | null;
  dataUsers: TUserData[];
  currenDireccionesList: TUserDireccion[];
};

const initialState: TInitialState = {
  isUserModalOpen: false,
  isEditMode: false,
  currentUser: null,
  dataUsers: [],
  currenDireccionesList: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsUserModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserModalOpen = action.payload;
    },
    setIsEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
    },
    setDataForTableInErrorCase: (state, action: PayloadAction<TUserData[]>) => {
      state.dataUsers = action.payload;
    },
    addUser: (state, action: PayloadAction<TUserData>) => {
      state.dataUsers = [...state.dataUsers, action.payload];
    },
    setCurrentUser: (state, action: PayloadAction<TUserData>) => {
      state.currentUser = action.payload;
    },
    setCurrenDireccionesList: (state, action: PayloadAction<TUserDireccion[]>) => {
      state.currenDireccionesList = action.payload;
    },
    addDireccionToList: (state, action: PayloadAction<TUserDireccion>) => {
      state.currenDireccionesList = [...state.currenDireccionesList, action.payload];
    },
    changeDefaultAddress: (state, action: PayloadAction<{ id: string; checked: boolean }>) => {
      const copy = state.currenDireccionesList;
      copy.forEach(elem => (elem.defaultAddress = false));
      const dirIndex = state.currenDireccionesList.findIndex(el => el.id === action.payload.id);
      if (dirIndex !== -1) {
        copy[dirIndex].defaultAddress = action.payload.checked;
        state.currenDireccionesList = copy;
      }
    },
    clearDireccionesList: state => {
      state.currenDireccionesList = [];
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const copy = state.dataUsers;
      state.dataUsers = copy.filter(elem => elem.id !== action.payload);
    },
    replaceUser: (state, action: PayloadAction<TUserData>) => {
      const userIndex = state.dataUsers.findIndex(el => el.id === action.payload.id);
      const copy = state.dataUsers;
      copy[userIndex] = action.payload;
      state.dataUsers = copy;
    }
  },
});

export const {
  setIsUserModalOpen,
  setIsEditMode,
  setDataForTableInErrorCase,
  addUser,
  removeUser,
  addDireccionToList,
  changeDefaultAddress,
  clearDireccionesList,
  setCurrentUser,
  setCurrenDireccionesList,
  replaceUser
} = usersSlice.actions;

export const isUserModalOpenSelect = (state: RootState) => state.users.isUserModalOpen;
export const isEditModeSelect = (state: RootState) => state.users.isEditMode;
export const dataUsersSelect = (state: RootState) => state.users.dataUsers;
export const currenDireccionesListSelect = (state: RootState) => state.users.currenDireccionesList;
export const currentUserSelect = (state: RootState) => state.users.currentUser;

export default usersSlice.reducer;
