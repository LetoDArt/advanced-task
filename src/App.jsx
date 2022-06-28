import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Actions from './components/Tables/tableActions';
import Relations from './components/Tables/TableRelations';

import { tableActions } from './redux/tables/actions';

import { publicRoutes } from './routes/routes';
import { PRODUCT_LIST_KEY, PRODUCT_WAREHOUSE_QUANTITY, WAREHOUSE_LIST_KEY } from './components/Tables/consts';

import './App.scss';


const products = new Actions(PRODUCT_LIST_KEY);
const warehouse = new Actions(WAREHOUSE_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tableActions.setProductList(products.getDataListFromLocalStorage()));
    dispatch(tableActions.setWarehouseList(warehouse.getDataListFromLocalStorage()));
    dispatch(tableActions.setProductWarehouseQuantities(relations.getRelationListFromLocalStorage()));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.element}
              exact={route.exact}
              key={route.path}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
