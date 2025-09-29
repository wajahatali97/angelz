// services/userService.js

// LocalStorage keys
const USER_KEY = "userProfile";

// 🟢 Get profile (localStorage version)
export const getProfile = async () => {
  const saved = localStorage.getItem(USER_KEY);
  return saved ? JSON.parse(saved) : null;
};

// 🟢 Update profile (localStorage version)
export const updateProfile = async (newData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(newData));
  return newData;
};

/*
---------------------------------------------
🔄 When API is ready, replace with:

export const getProfile = async () => {
  const token = localStorage.getItem("authToken");
  const res = await fetch("/api/users/user-profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.userDetails;
};

export const updateProfile = async (payload) => {
  const token = localStorage.getItem("authToken");
  const res = await fetch("/api/users/edit-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
---------------------------------------------
*/
