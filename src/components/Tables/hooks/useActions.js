import { useDispatch } from 'react-redux';
import { PRODUCT_TABLE_ID } from '../consts';


export const useAddItem = (action, reduxAction) => {
  const dispatch = useDispatch();
  return (item) => {
    action.addOptionToDataList(item);
    dispatch(reduxAction(action.getDataListFromLocalStorage()));
  };
};

export const useEditItem = (action, reduxAction) => {
  const dispatch = useDispatch();
  return (item) => {
    action.editItemOfList(item);
    dispatch(reduxAction(action.getDataListFromLocalStorage()));
  };
};

export const useDeleteItem = (tableId, action, reduxAction, quantities, relation, relationRedux) => {
  const dispatch = useDispatch();
  const key = tableId === PRODUCT_TABLE_ID ? 'prodId' : 'storeId';
  return (item) => {
    action.deleteOneItemFromList(item);
    dispatch(reduxAction(action.getDataListFromLocalStorage()));
    const clearedRelations = [...quantities].filter((rel) => rel[key] !== item.id);
    relation.setRelationListInLocalStorage(clearedRelations);
    dispatch(relationRedux(relation.getRelationListFromLocalStorage()));
  };
};
