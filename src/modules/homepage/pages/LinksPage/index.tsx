import { useMemo } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getLinks } from '@/apis/links.api';
import { ICreateLinksParams } from '@/types/links';

import { MLinksForm } from '../../components';

const ListEventsPage = () => {
  //#region Data
  const { data } = useQuery(['links'], () => getLinks());

  const formData = useMemo(() => {
    if (data?.data?.data) {
      const values: ICreateLinksParams = {
        youth: '',
        online: '',
        certificate: '',
        support: '',
        facebook: '',
      };
      data.data.data?.forEach((e) => {
        if (e.category === 1) values.youth = e.url;
        if (e.category === 2) values.online = e.url;
        if (e.category === 3) values.certificate = e.url;
        if (e.category === 4) values.support = e.url;
        if (e.category === 5) values.facebook = e.url;
      });
      return values;
    } else return undefined;
  }, [data]);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Box>
      <Stack mb={3}>
        <Typography variant="page-title">Liên kết</Typography>
      </Stack>

      <Paper variant="wrapper">
        <MLinksForm data={formData} />
      </Paper>
    </Box>
  );
  //#endregion
};

export default ListEventsPage;
