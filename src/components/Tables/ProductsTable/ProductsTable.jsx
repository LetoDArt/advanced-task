import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useProductDataPattern } from '../hooks/useTableDataPattern';
import { useGetQuantity } from '../hooks/useGetQuantity';
import { useAddItem, useDeleteItem, useEditItem } from '../hooks/useActions';
import { useCreateDistributionRows } from '../hooks/useCreateDistributionRows';
import { useAdvancedValueSetter } from '../hooks/useAdvancedValueSetter';
import { useProductErrorChecker } from '../hooks/useErrorChecker';
import { useQuantityProcessor } from '../hooks/useQuantityProcessor';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';
import AddEditModal from '../AddEditModal/AddEditModal';
import WarningModal from '../WarningModal/WarningModal';

import { getProductList, getQuantitiesList, getWarehouseList } from '../../../redux/tables/selectors';

import {
  INITIAL_VALUES_OF_PRODUCT_STATE,
  PRODUCT_LIST_KEY,
  PRODUCT_TABLE_ID,
  PRODUCT_WAREHOUSE_QUANTITY,
  WARNING_ON_DELETION_MESSAGE,
} from '../consts';

import { tableActions } from '../../../redux/tables/actions';

import Actions from '../tableActions';
import Relations from '../TableRelations';

import '../TableStyles/TableStyles.scss';


const actions = new Actions(PRODUCT_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

const TableList = () => {
  const dispatch = useDispatch();

  const [openProductWindow, setOpenProductWindow] = useState(false);
  const [productId, setProductId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [listQuantities, setListQuantities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [values, setValues] = useState(INITIAL_VALUES_OF_PRODUCT_STATE);
  const [warn, setWarn] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(true);

  const productList = useSelector(getProductList);
  const warehouseList = useSelector(getWarehouseList);
  const quantitiesList = useSelector(getQuantitiesList);

  const dataPattern = useProductDataPattern(values);
  const getQuantity = useGetQuantity(PRODUCT_TABLE_ID, listQuantities, setListQuantities);
  const addItem = useAddItem(actions, tableActions.setProductList);
  const editItem = useEditItem(actions, tableActions.setProductList);
  const createWarehouseRows = useCreateDistributionRows(PRODUCT_TABLE_ID, warehouseList, quantitiesList);
  const advancedSetter = useAdvancedValueSetter(setValues);
  const checkError = useProductErrorChecker(advancedSetter);
  const setQuantitiesToMemory = useQuantityProcessor(isEditing, listQuantities);
  const deleteItem = useDeleteItem(
    PRODUCT_TABLE_ID,
    actions,
    tableActions.setProductList,
    quantitiesList,
    relations,
    tableActions.setProductWarehouseQuantities,
  );

  const closeWarn = useCallback(() => setWarn(false), []);
  const closeWindow = useCallback(() => setOpenProductWindow(false), []);

  const showWarn = useCallback((item) => {
    setItemToDelete(item);
    setWarn(true);
  }, []);
  const forceOpenAddWindow = useCallback((editing = false, product) => {
    const edit = typeof editing === 'boolean' && editing;
    setListQuantities([]);
    setWarehouses(createWarehouseRows(edit, product?.id));
    setIsEditing(edit ?? false);
    setProductId(edit ? product?.id : '');
    setValues(edit ? { ...product } : INITIAL_VALUES_OF_PRODUCT_STATE);
    setOpenProductWindow(true);
  }, [createWarehouseRows]);

  const deleteProd = useCallback(() => {
    deleteItem(itemToDelete);
    closeWarn();
  }, [itemToDelete]);


  const processApply = (usedQuantity) => {
    const product = {
      id: isEditing ? productId : `row ${Date.now()}`,
      ...values,
      nonUsedQuantity: +values.quantity - +usedQuantity,
      error: '',
    };
    const existing = [...quantitiesList];
    listQuantities.forEach((item) => { item.prodId = product.id; });

    const result = setQuantitiesToMemory(existing, product);

    relations.setRelationListInLocalStorage(result);
    dispatch(tableActions.setProductWarehouseQuantities(result));
    if (isEditing) editItem(product);
    else addItem(product);
  };

  const addProductApply = () => {
    const usedQuantity = listQuantities.reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    if (!checkError(values, listQuantities, usedQuantity)) {
      processApply(usedQuantity);
      closeWindow();
    }
  };

  return (
    <>
      <Card
        wrapperClass="table-list-container"
        btnTitle="Add product"
        btnFunction={forceOpenAddWindow}
        pgTitle="Products"
      >
        <div className="table-body">
          <TableItself rows={productList} deleteFunc={showWarn} editItem={forceOpenAddWindow} />
        </div>
      </Card>
      <AddEditModal
        title="Add Product"
        values={values}
        distribution={warehouses}
        open={openProductWindow}
        getQuantity={getQuantity}
        handleClose={closeWindow}
        listQuantities={listQuantities}
        setQuantities={setListQuantities}
        applyFunc={addProductApply}
        setter={advancedSetter}
        modalPattern={dataPattern}
      />
      <WarningModal
        open={warn}
        handleClose={closeWarn}
        message={WARNING_ON_DELETION_MESSAGE}
        apply={deleteProd}
      />
    </>
  );
};

export default TableList;
