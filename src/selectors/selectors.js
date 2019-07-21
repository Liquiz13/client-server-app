export const selectUserById = (state, userId) => state.users.find((user) => user._id === userId);
export const getCurrentUser = (state, userId) => state.users.find((user) => user._id === userId);
