import { useCookie } from "@reactuses/core";

const defaultOption = {
  path: "/",
};

export default function Demo() {
  const cookieName = "cookie-key";
  const [cookieValue, updateCookie, refreshCookie] = useCookie(
    cookieName,
    defaultOption,
    "default-value",
  );

  const updateButtonClick = () => {
    updateCookie("new-cookie-value");
  };

  const deleteButtonClick = () => {
    updateCookie(undefined);
  };

  const change = () => {
    if ("cookieStore" in window) {
      const store = window.cookieStore as any;
      store.set({ name: cookieName, value: "changed" });
    }
    else {
      document.cookie = `${cookieName}=changed; path=/`;
    }
  };

  return (
    <div>
      <p>Click on the button to update or clear the cookie</p>
      <p color="blue">cookie: {cookieValue || "no value"}</p>
      <button onClick={updateButtonClick}>Update the cookie</button>
      <button onClick={deleteButtonClick}>Clear the cookie</button>
      <button onClick={change}>
        Changing the cookie through other methods
      </button>
      <button onClick={refreshCookie}>Refresh the cookie</button>
    </div>
  );
}
