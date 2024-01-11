import {useState} from 'react';
import {
  useDeleteDataQuery,
  usePostDataQuery,
  useUpdateDataQuery,
} from '../../Store/queries/todoQuery';

interface IData {
  id: number;
  title: string | undefined;
}

export const TodoViewModel = () => {
  const [data, setData] = useState<IData>({
    id: 0,
    title: '',
  });

  // query
  const onSaveData = usePostDataQuery(data);
  const onDeleteData = useDeleteDataQuery(data);
  const onUpdateData = useUpdateDataQuery(data);

  return {data, setData, onSaveData, onDeleteData, onUpdateData};
};
