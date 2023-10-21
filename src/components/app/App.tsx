import React from 'react';
import './App.css';
import {AppHeader} from "../appHeader/appHeader";
import {MainPanel} from "../constructor/mainPanel/mainPanel";
import {MainLayout} from "../common/mainLayout/mainLayout";
import {BurgerIngredients} from "../constructor/burgerIngredients/burgerIngredients";
import {data} from "../../utils/data";

function App() {
  return (
    <div className='page-container'>
      <AppHeader />
      <MainLayout>
        <MainPanel>
          <BurgerIngredients data={data}/>
        </MainPanel>
        <MainPanel>
          <div>Корзина</div>
        </MainPanel>
      </MainLayout>
    </div>
  );
}

export default App;
