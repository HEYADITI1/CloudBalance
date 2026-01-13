import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    sidebarCollapsed: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebar(state, action) {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;
