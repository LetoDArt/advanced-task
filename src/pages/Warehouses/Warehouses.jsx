import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductList, getQuantitiesList, getWarehouseList } from '../../redux/tables/selectors';
import { useWarehouseDataTable } from '../../components/Tables/hooks/useTableDataPattern';
import { useGetQuantity } from '../../components/Tables/hooks/useGetQuantity';
import { useAddItem, useDeleteItem, useEditItem } from '../../components/Tables/hooks/useActions';
import { useCreateDistributionRows } from '../../components/Tables/hooks/useCreateDistributionRows';
import { useAdvancedValueSetter } from '../../components/Tables/hooks/useAdvancedValueSetter';
import { useWarehouseErrorChecker } from '../../components/Tables/hooks/useErrorChecker';
import { useWarehouseQuantityProcessor } from '../../components/Tables/hooks/useQuantityProcessor';

import NavigationSystem from '../../components/NavigationSystem/NavigationSystem';
import AddEditModal from '../../components/Tables/AddEditModal/AddEditModal';
import MainTable from '../../components/Tables/MainTable/MainTable';

import { navigationActions } from '../../redux/navigation/actions';
import { tableActions } from '../../redux/tables/actions';

import { WAREHOUSE_PAGE_ID } from '../../components/NavigationSystem/consts';
import {
  INITIAL_VALUES_OF_WAREHOUSE_STATE, PRODUCT_WAREHOUSE_QUANTITY, WAREHOUSE_HEADER,
  WAREHOUSE_LIST_KEY,
  WAREHOUSE_TABLE_ID,
} from '../../components/Tables/consts';

import Actions from '../../components/Tables/tableActions';
import Relations from '../../components/Tables/TableRelations';


const actions = new Actions(WAREHOUSE_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

const Warehouses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigationActions.setChosenOption(WAREHOUSE_PAGE_ID));
  }, []);


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
    <NavigationSystem>
      <MainTable
        tableId={WAREHOUSE_TABLE_ID}
        pageTitle="Warehouses"
        addButtonTitle="Add warehouse"
        header={WAREHOUSE_HEADER}
        rows={warehousesList}
        deleteBtn={deleteItem}
        editBtn={forceOpenAddWindow}
      />
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
    </NavigationSystem>
  );
};

export default Warehouses;
