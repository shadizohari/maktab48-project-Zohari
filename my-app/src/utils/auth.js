export const isLoggedIn = () => {
  /*
   * Check if user is logged in and has token
   */
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};

export const logout = () => {
  /*
   * Clear localStorage
   */

  localStorage.clear();
  window.location.reload();
};

export const uniqId = (data) => {
  let arrayOfId = [];
  if (data.length >= 0) {
    console.log("data.length>0")
    for (let i = 0; i < data.length; i++) {
      arrayOfId.push(data.id);
    }
    return Math.max(...arrayOfId);
  } else {
    return 1;
  }

}

