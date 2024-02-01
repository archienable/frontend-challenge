import Header from "./Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllCats from "./Header/AllCats/AllCats";
import FavoriteCats from "./Header/FavoriteCats/FavoriteCats";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="contentContainer">
          <Routes>
            <Route path='/allCats/' element={ <AllCats /> }/>
            <Route path='/favoriteCats/' element={ <FavoriteCats /> }/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
