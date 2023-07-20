import { Route, Routes } from "react-router-dom";
import { menuGroup, routes } from "website:routes";
import Header from "./pages/header";
import Index from "./pages/index";
import "./main.css";
import "highlight.js/styles/stackoverflow-light.css";
import "react-toastify/dist/ReactToastify.css";
import type { IMenu } from "./layout";
import Layout from "./layout";
import { guideMenu, guideRoutes } from "./pages/guide";

function App() {
  const mainMenus: IMenu[] = menuGroup.map((menus) => {
    const { title } = menus;
    const items = menus.items.slice().map((item) => {
      return {
        path: item,
        title: item,
      };
    });

    return {
      title,
      items,
    };
  });

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
      <Routes>
        <Route path={"/"} element={<Index />} key="main page" />
        <Route
          path={"/core/*"}
          element={<Layout menuGroup={mainMenus} routes={routes} />}
        />
        <Route
          path={"/guide/*"}
          element={<Layout menuGroup={guideMenu} routes={guideRoutes} />}
        />
      </Routes>
    </>
  );
}

export default App;
