import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModalType: undefined,
  isOpen: false,
  modalProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {

    setCurrentModalType: (state, action) => ({
      ...state,
      currentModalType: action.payload.type,
      modalProps: action.payload.props,
    }),

    toggleIsOpen: (state) => ({ ...state, isOpen: !state.isOpen }),

  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
export const selectCurrentModalType = (state) => state.modal.currentModalType;
export const selectModalProps = (state) => state.modal.modalProps;
export const selectIsOpen = (state) => state.modal.isOpen;
