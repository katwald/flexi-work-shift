import { createSlice } from "@reduxjs/toolkit";
import bookingServices from "../services/bookings";

const initialState = [
  {
    venueName: "",
    bookingStatus: {
      bookingStart: "",
      bookingEnd: "",
      bookingDescription: "",
      cleaningDate: "",
    },
    cleaningStatus: {
      cleanedDate: "",
      assignedCleaner: "",
      cleaningStatus: "",
      cleaningHour: 0,
    },
    comments: [],
  },
];

const bookingSlice = createSlice({
  name: "bookings",
  initialState: initialState,
  reducers: {
    setBookings: (state, action) => {
      return action.payload;
    },
    appendBooking: (state, action) => {
      state.push(action.payload);
    },
    modifyBooking(state, action) {
      const updatedBooking = state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      return updatedBooking;
    },
    deleteBooking: (state, action) => {
      const removedbookings = state.filter(
        (booking) => booking.id !== action.payload
      );
      return removedbookings;
    },
    appendComment: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const {
  setBookings,
  appendBooking,
  modifyBooking,
  deleteBooking,
  appendComment,
} = bookingSlice.actions;

const getTokenFromLocalStorage = () => {
  const loggedFlexWorkAppUserJSON = window.localStorage.getItem(
    "loggedFlexWorkAppUser"
  );
  if (loggedFlexWorkAppUserJSON) {
    const user = JSON.parse(loggedFlexWorkAppUserJSON);
    return user.token;
  }
};

export const initializeBookings = () => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    bookingServices.setToken(token);
    const bookings = await bookingServices.getAll();
    dispatch(setBookings(bookings));
  };
};

export const createBooking = (bookinObject) => {
  const { bookingDescription, bookingStart, bookingEnd, cleaningDate } =
    bookinObject.bookingStatus;
  const newObj = {
    ...initialState[0],
    venueName: bookinObject.venueName,
    bookingStatus: {
      ...initialState.bookingStatus,
      bookingDescription: bookingDescription,
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      cleaningDate: cleaningDate,
    },
  };
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    bookingServices.setToken(token);
    const response = await bookingServices.createNew(newObj);
    dispatch(appendBooking(response));
  };
};
export const updateBooking = (bookingId, updatedObj) => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    bookingServices.setToken(token);
    console.log("bookingId...", updatedObj);
    const response = await bookingServices.update(bookingId, updatedObj);
    console.log("response....", response);
    dispatch(modifyBooking(response));
  };
};
export const removeBooking = (bookingId) => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    bookingServices.setToken(token);
    await bookingServices.remove(bookingId);
    dispatch(deleteBooking(bookingId));
  };
};
export const addComment = (bookingId, commentObj) => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    bookingServices.setToken(token);
    // Api request should be changed to create, when it will be integreted with backend api.
    const response = await bookingServices.update(bookingId, commentObj);
    dispatch(appendComment(response));
  };
};

export default bookingSlice.reducer;
