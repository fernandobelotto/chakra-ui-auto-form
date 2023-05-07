import { mock } from '../mock';
import { sortDeeply } from "../sortDeeply";
import { EditForm } from './dinamic-form/EditForm';



function AppForm() {

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  const sortedData = sortDeeply(mock);


  return (
    <EditForm data={sortedData} onSubmit={onSubmit} />
  );
}

export default AppForm;
