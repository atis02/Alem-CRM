import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../reducers/AuthSlice";
import ImageUpdateSlice from "./ImageUpdateSlice";
import UserSlice from "./UserSlice";
import ComeTimeSlice from "./ComeTimeSlice";
import PdfSlice from "./PdfSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    imgAccount: ImageUpdateSlice,
    users: UserSlice,
    getWorkDate: ComeTimeSlice,
    uploadPDf: PdfSlice,
  },
});
