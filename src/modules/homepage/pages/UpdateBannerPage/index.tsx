import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getBannerById } from '@/apis/banners.api';
import { MBannerForm } from '@/modules/homepage/components';

const UpdateBannerPage = () => {
  //#region Data
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['banner-detail', id],
    queryFn: () => getBannerById(id as string),
  });
  //#endregion

  //#region Event

  //#endregion

  //#region Render
  return (
    <div>
      <MBannerForm data={data?.data?.data} />
    </div>
  );
  //#endregion
};

export default UpdateBannerPage;
