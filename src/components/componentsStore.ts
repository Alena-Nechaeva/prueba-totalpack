import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { TUserData, TUserDireccion } from '@/api/api.types';

type TInitialState = {
  isUserModalOpen: boolean;
  isEditMode: boolean;
  currentUser: TUserData | null;
  dataUsers: TUserData[];
  currentDireccionesList: TUserDireccion[];
};

const initialState: TInitialState = {
  isUserModalOpen: false,
  isEditMode: false,
  currentUser: null,
  dataUsers: [],
  currentDireccionesList: [],
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
    setcurrentDireccionesList: (state, action: PayloadAction<TUserDireccion[]>) => {
      state.currentDireccionesList = action.payload;
    },
    addDireccionToList: (state, action: PayloadAction<TUserDireccion>) => {
      state.currentDireccionesList = [...state.currentDireccionesList, action.payload];
    },
    changeDefaultAddress: (state, action: PayloadAction<{ id: string; checked: boolean }>) => {
      state.currentDireccionesList = state.currentDireccionesList.map(el => ({
        ...el,
        defaultAddress: el.id === action.payload.id ? action.payload.checked : false
      }));
    },
    clearDireccionesList: state => {
      state.currentDireccionesList = [];
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const copy = state.dataUsers;
      state.dataUsers = copy.filter(elem => elem.id !== action.payload);
    },
    replaceUser: (state, action: PayloadAction<TUserData>) => {
      const userIndex = state.dataUsers.findIndex(el => el.id === action.payload.id);
      if (userIndex !== -1) {
        state.dataUsers = state.dataUsers.map((user, index) =>
          index === userIndex ? action.payload : user
        );
      }
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
  setcurrentDireccionesList,
  replaceUser
} = usersSlice.actions;

export const isUserModalOpenSelect = (state: RootState) => state.users.isUserModalOpen;
export const isEditModeSelect = (state: RootState) => state.users.isEditMode;
export const dataUsersSelect = (state: RootState) => state.users.dataUsers;
export const currentDireccionesListSelect = (state: RootState) => state.users.currentDireccionesList;
export const currentUserSelect = (state: RootState) => state.users.currentUser;

export default usersSlice.reducer;
