


export function getCurrentUserData() {
  const currentUser = localStorage.getItem("pocketbase_auth");
  if(currentUser === null) return;
  const currentUserData = JSON.parse(currentUser).model;
  return currentUserData;
}