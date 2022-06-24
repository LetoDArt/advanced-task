import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import NavigationSystem from '../../components/NavigationSystem/NavigationSystem';
import ProductsTable from '../../components/Tables/ProductsTable/ProductsTable';

import { navigationActions } from '../../redux/navigation/actions';
import { PRODUCTS_PAGE_ID } from '../../components/NavigationSystem/consts';


const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigationActions.setChosenOption(PRODUCTS_PAGE_ID));
  }, []);

  return (
    <NavigationSystem>
      <ProductsTable />
    </NavigationSystem>
  );
};

export default Products;
