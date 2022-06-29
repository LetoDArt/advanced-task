import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useWarehouseDataTable } from '../hooks/useTableDataPattern';
import { useGetQuantity } from '../hooks/useGetQuantity';
import { useAddItem, useDeleteItem, useEditItem } from '../hooks/useActions';
import { useCreateDistributionRows } from '../hooks/useCreateDistributionRows';
import { useAdvancedValueSetter } from '../hooks/useAdvancedValueSetter';
import { useWarehouseErrorChecker } from '../hooks/useErrorChecker';
import { useWarehouseQuantityProcessor } from '../hooks/useQuantityProcessor';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';
import AddEditModal from '../AddEditModal/AddEditModal';

import Actions from '../tableActions';
import Relations from '../TableRelations';

import { tableActions } from '../../../redux/tables/actions';
import { getProductList, getQuantitiesList, getWarehouseList } from '../../../redux/tables/selectors';

import {
  INITIAL_VALUES_OF_WAREHOUSE_STATE,
  PRODUCT_WAREHOUSE_QUANTITY,
  WAREHOUSE_LIST_KEY,
  WAREHOUSE_TABLE_ID,
} from '../consts';

import '../TableStyles/TableStyles.scss';


const actions = new Actions(WAREHOUSE_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

const TableList = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState(INITIAL_VALUES_OF_WAREHOUSE_STATE);
  const [products, setProducts] = useState([]);
  const [warehouseId, setWarehouseId] = useState('');
  const [listQuantities, setListQuantities] = useState([]);
  const [openWarehouseWindow, setOpenWarehouseWindow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const warehousesList = useSelector(getWarehouseList);
  const productsList = useSelector(getProductList);
  const quantitiesList = useSelector(getQuantitiesList);

  const dataPattern = useWarehouseDataTable(values);
  const getQuantity = useGetQuantity(WAREHOUSE_TABLE_ID, listQuantities, setListQuantities);
  const addItem = useAddItem(actions, tableActions.setWarehouseList);
  const editItem = useEditItem(actions, tableActions.setWarehouseList);
  const createProductRows = useCreateDistributionRows(WAREHOUSE_TABLE_ID, productsList, quantitiesList);
  const advancedSetter = useAdvancedValueSetter(setValues);
  const checkError = useWarehouseErrorChecker(advancedSetter);
  const setQuantitiesToMemory = useWarehouseQuantityProcessor(isEditing, listQuantities);
  const deleteItem = useDeleteItem(
    WAREHOUSE_TABLE_ID,
    actions,
    tableActions.setWarehouseList,
    quantitiesList,
    relations,
    tableActions.setProductWarehouseQuantities,
  );

  const closeWindow = useCallback(() => setOpenWarehouseWindow(false), []);
  const forceOpenAddWindow = (editing, warehouse) => {
    const edit = typeof editing === 'boolean' && editing;
    setListQuantities([]);
    setProducts(createProductRows(edit, warehouse?.id));
    setIsEditing(edit ?? false);
    setWarehouseId(edit ? warehouse?.id : '');
    setValues(edit ? { ...warehouse } : INITIAL_VALUES_OF_WAREHOUSE_STATE);
    setOpenWarehouseWindow(true);
  };

  const processApply = () => {
    const store = {
      id: isEditing ? warehouseId : `row ${Date.now()}`,
      ...values,
      error: '',
    };
    const existing = [...quantitiesList];
    listQuantities.forEach((item) => { item.storeId = store.id; });

    const result = setQuantitiesToMemory(existing, store);

    relations.setRelationListInLocalStorage(result);
    dispatch(tableActions.setProductWarehouseQuantities(result));
    if (isEditing) editItem(store);
    else addItem(store);
  };

  const addProductApply = () => {
    if (!checkError(values, listQuantities)) {
      processApply();
      closeWindow();
    }
  };


  return (
    <>
      <Card
        wrapperClass="table-list-container"
        btnTitle="Add Warehouse"
        btnFunction={forceOpenAddWindow}
        pgTitle="Warehouses"
      >
        <div className="table-body">
          <TableItself rows={warehousesList} deleteFunc={deleteItem} editItem={forceOpenAddWindow} />
        </div>
      </Card>
      <AddEditModal
        title="Add Store"
        values={values}
        distribution={products}
        open={openWarehouseWindow}
        getQuantity={getQuantity}
        handleClose={closeWindow}
        listQuantities={listQuantities}
        setQuantities={setListQuantities}
        applyFunc={addProductApply}
        setter={advancedSetter}
        modalPattern={dataPattern}
        warehouseDist
      />
    </>
  );
};

export default TableList;

