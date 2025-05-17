// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { addPostApi, fetchPosts } from "../services/postsApi";

// const initialState = {
//   posts: [],
//   isLoading: false,
//   error: "",
// };

// // First, create the thunk
// export const fetchPostsData = createAsyncThunk("posts/fetchData", async () => {
//   try {
//     const data = await fetchPosts();
//     console.log("thunk", data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message || "Failed to fetch posts");
//   }
// });

// export const addPostAPI = createAsyncThunk("posts/addPost", async (post) => {
//   try {
//     const data = await addPostApi(post);
//     console.log("thunk", data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message || "Failed to fetch posts");
//   }
// });

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     // changePage(state) {},
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPostsData.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchPostsData.fulfilled, (state, action) => {
//         state.posts = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchPostsData.rejected, (state, action) => {
//         state.error = action.error.message || "Failed to Fetch Data";
//         state.isLoading = false;
//       })
//       .addCase(addPostAPI.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addPostAPI.fulfilled, (state, action) => {
//         state.posts = [...state.posts, action.payload];
//         state.isLoading = false;
//       })
//       .addCase(addPostAPI.rejected, (state, action) => {
//         state.error = action.error.message || "Failed to Add new Post";
//         state.isLoading = false;
//       });
//   },
// });

// export const { addPost } = postsSlice.actions;
// export const postsReducer = postsSlice.reducer;
