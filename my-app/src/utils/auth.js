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


export const paginationCalculate = (length, pageNumber) => {
  let x = length % pageNumber;
  let y;
  if (x != 0) {
    y = (length / pageNumber) + 1;
  } else {
    y = length / pageNumber;
  }
  let arr = [];
  for (let i = 1; i <= y; i++) {
    arr.push(i)
  }
  return ([...arr])
}


export const formatPrice = (num) => {
  let numStr = String(num);
  let result = "";
  let digits = 0;
  for (let i = numStr.length - 1; i >= 0; i--) {
    digits++;
    result = numStr[i] + result;
    if (digits % 3 == 0) result = "," + result;
  }
  if (result[0] === ",") {
    let num = "";
    for (let i = 1; i < result.length; i++) {
      num += result[i];
    }
    return num;
  }
  return result
}