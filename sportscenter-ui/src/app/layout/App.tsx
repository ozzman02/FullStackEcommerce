import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getBasketFromLocalStorage } from "../util/Util";
import { useAppDispatch } from "../store/configureStore";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import agent from "../api/agent";
import { setBasket } from "../../features/basket/basketSlice";
import Spinner from "./Spinner";

function App() {

  const dispatch = useAppDispatch();

  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode:paletteType,
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const basket = getBasketFromLocalStorage();
    dispatch(fetchCurrentUser());
    if (basket) {
      agent.BasketApi.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  });
  
  if (loading) return <Spinner message="Getting Basket..." />
  
  /* 
     Check zIndex comment on Header.tsx.
  */
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container sx={{ paddingTop: "85px" }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
