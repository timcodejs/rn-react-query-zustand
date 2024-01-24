import {useEffect, useState} from 'react';
import {
  useDeleteDataQuery,
  usePostDataQuery,
  useUpdateDataQuery,
} from '../../Store/queries/todoQuery';

interface IData {
  id: number;
  title: string | undefined;
}
interface TodoViewModelData {
  refetch: any;
}

export const TodoViewModel = ({refetch}: TodoViewModelData) => {
  const [isEdit, setIisEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState<IData>({
    id: 0,
    title: '',
  });

  // query
  const onSaveData = usePostDataQuery(data);
  const onDeleteData = useDeleteDataQuery(data);
  const onUpdateData = useUpdateDataQuery(data);

  useEffect(() => {
    if (
      onSaveData?.isSuccess ||
      onDeleteData?.isSuccess ||
      onUpdateData?.isSuccess
    ) {
      refetch();
      setInputValue('');
    }
  }, [onDeleteData?.isSuccess, onSaveData?.isSuccess, onUpdateData?.isSuccess]);

  const handleChange = (e: any) => {
    setInputValue(e);
    setData({
      id: isEdit ? data.id : Math.floor(Math.random() * (100 - 4) + 4),
      title: e,
    });
  };

  const handlePost = () => {
    if (data.title === '') {
      return;
    } else {
      onSaveData.mutate();
    }
  };

  const handleDelete = (index: number) => {
    setData({
      id: index,
      title: '',
    });
    onDeleteData.mutate();
  };

  const handleEdit = (item: any) => {
    setIisEdit(true);
    setData({
      id: item.id,
      title: item.title,
    });
  };

  return {
    data,
    setData,
    isEdit,
    setIisEdit,
    inputValue,
    onSaveData,
    onDeleteData,
    onUpdateData,
    handleChange,
    handlePost,
    handleEdit,
    handleDelete,
  };
};
