import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getFooterLeft, updateFooterLeft } from '@/apis/footer.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import {
  IGetFooterLeftResponse,
  IUpdateFooterLeftParams,
} from '@/types/footer';

import { MFooterLeftForm } from '../../components';
import { defaultValuesFooterLeft, footerLeftResolver } from '../../form';

const FooterLeftPage = () => {
  useTitle('Quản lý Footer trái');
  //#region Data
  const { data, error, isError } = useQuery(['folder-left'], () =>
    getFooterLeft(),
  );

  const footerLeft: IGetFooterLeftResponse | undefined = useMemo(
    () => data?.data?.data ?? undefined,
    [data],
  );

  if (error && isError)
    toast.error((error as any)?.response?.data?.message || 'Có lỗi xảy ra!');

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUpdateFooterLeftParams>({
    mode: 'all',
    resolver: footerLeftResolver,
    defaultValues: defaultValuesFooterLeft,
  });
  //#endregion

  //#region Event
  useEffect(() => {
    if (footerLeft) {
      const viAddressMap = Object.entries(footerLeft.address.vi);
      const viAddr = viAddressMap.map((e, i) => ({
        id: i,
        base: e[0],
        content: e[1],
      }));
      const enAddressMap = Object.entries(footerLeft.address.en);
      const enAddr = enAddressMap.map((e, i) => ({
        id: i,
        base: e[0],
        content: e[1],
      }));
      reset({
        _id: footerLeft._id,
        title: footerLeft.title,
        address: { vi: viAddr, en: enAddr },
        phone: footerLeft.phone,
        fax: footerLeft.fax,
      });
    }
  }, [footerLeft]);

  const onCancel = (values?: IUpdateFooterLeftParams) => {
    if (values) {
      reset(values);
    } else {
      reset();
    }
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const viAddressMap = values.address.vi.map((e) => [e.base, e.content]);
        const viAddressHashMap = Object.fromEntries(viAddressMap);
        const enAddressMap = values.address.en.map((e) => [e.base, e.content]);
        const enAddressHashMap = Object.fromEntries(enAddressMap);
        const address = { vi: viAddressHashMap, en: enAddressHashMap };

        const formData = new FormData();
        formData.set('_id', values._id);
        formData.set('title', JSON.stringify(values.title));
        formData.set('address', JSON.stringify(address));
        formData.set('phone', values.phone);
        formData.set('fax', values.fax);

        await updateFooterLeft(formData);
        toast.success(toastMessage('footer trái').SUCCESS.UPDATE);
        onCancel(values);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('footer trái').SUCCESS.UPDATE,
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <Box>
      <Stack mb={3}>
        <Typography variant="page-title">Footer Trái</Typography>
      </Stack>
      <Paper variant="wrapper">
        <form>
          <MFooterLeftForm control={control} />

          <CActionsForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </form>
      </Paper>
    </Box>
  );
  //#endregion
};

export default FooterLeftPage;
