import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getEventById } from '@/apis/events.api';
import { MEventForm } from '@/modules/homepage/components';

const UpdateEventPage = () => {
  //#region Data
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['event-detail', id],
    queryFn: () => getEventById(id as string),
  });
  //#endregion

  //#region Event

  //#endregion

  //#region Render
  return (
    <div>
      <MEventForm data={data?.data?.data} />
    </div>
  );
  //#endregion
};

export default UpdateEventPage;
