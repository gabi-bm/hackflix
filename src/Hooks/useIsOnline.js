function useIsOnline() {
  window.addEventListener("offline", function (e) {
    console.log("offline");
  });
  window.addEventListener("online", function (e) {
    console.log("online");
  });
  return;
}

export default useIsOnline;
