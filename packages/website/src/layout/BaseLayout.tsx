import { Outlet } from "react-router-dom";
import Header from "../pages/header";
import "../main.css";
import "highlight.js/styles/stackoverflow-light.css";
import "react-toastify/dist/ReactToastify.css";
import "../github-markdown.css";

export default function BaseLayout() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          // 增加一个自执行的函数
          __html: `
        (function () {
          function setDark(dark) {
            dark &&  document.documentElement.classList.add('dark');
          }
          let store;
          try {
            store = JSON.parse(localStorage.getItem('reactuses-color-scheme'));
          } catch (err) { }
          let dark;
          if(store === null){
            const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            dark = darkQuery.matches;
          }else {
            dark = store;
          }
          setDark(dark)
        })();
      `,
        }}
      />
      <Header />
      <Outlet />
    </>
  );
}
