import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider, Stack, styled, Tab, Tabs } from '@mui/material';

import { queryStringToObject } from '@/funcs/';
import { useNavigateQuery } from '@/hooks/';

import {
  MActiveForm,
  MContactForm,
  MIntroduceForm,
  MLeadershipForm,
  MMissionForm,
  MOrganizationalStructureForm,
  MTimelineForm,
} from './MTabs';
import { IMDepartmentFunctionInfoFormProps, TabPanelProps } from './types';

const TABS = [
  { id: '0', value: 0, label: 'Giới thiệu' },
  { id: '1', value: 1, label: 'Timeline' },
  { id: '2', value: 2, label: 'Chức năng - Nhiệm vụ' },
  { id: '3', value: 3, label: 'Cơ cấu tổ chức' },
  { id: '4', value: 4, label: 'Hoạt động' },
  { id: '5', value: 5, label: 'Lãnh đạo qua các thời kỳ' },
  { id: '6', value: 6, label: 'Liên hệ' },
];

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTabs-root': {
    maxWidth: 1000,
  },
  '.MuiTabs-flexContainer': {
    display: 'grid',
    gridTemplateColumns: 'repeat(7,auto)',
  },
  marginBottom: theme.spacing(3),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  width: 'fit-content',
  fontSize: '16px',
  '&.Mui-selected': {
    borderBottom: '2px solid #124874',
    fontWeight: 600,
  },
}));

// IMPORTANT: value===current && ...render tab content
// để tránh các lỗi về DOM đối với component đó khi tab đó không active
function TabPanel(props: TabPanelProps) {
  const { children, value, current, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== current} {...other}>
      {value === current && children}
    </div>
  );
}

export const MDepartmentFunctionInfoForm: React.FC<
  IMDepartmentFunctionInfoFormProps
> = ({ department_id, data }) => {
  //#region Data
  const location = useLocation();

  const { navigateWithNewQuery } = useNavigateQuery();
  const queryParams = queryStringToObject(location.search);

  const [currentTab, setCurrentTab] = useState<number>(
    Number(queryParams?.tab) || 0,
  );

  //#endregion

  //#region Event
  const onTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number,
  ) => {
    navigateWithNewQuery({ tab: value });
    setCurrentTab(value);
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="column" spacing={2.5} mb={3}>
      <StyledTabs
        value={currentTab}
        onChange={onTabChange}
        TabIndicatorProps={{ sx: { display: 'none' } }}
        sx={{ marginBottom: '0px' }}
      >
        {TABS.map((e, i) => (
          <StyledTab key={e.id} value={e.value} label={e.label} sx={{}} />
        ))}
      </StyledTabs>
      <Divider />

      <div style={{ marginTop: 40 }}>
        <TabPanel value={0} current={currentTab}>
          <MIntroduceForm
            department_id={department_id}
            data={data?.department_function_introduces}
          />
        </TabPanel>
        <TabPanel value={1} current={currentTab}>
          <MTimelineForm
            department_id={department_id}
            data={data?.department_function_timelines}
          />
        </TabPanel>
        <TabPanel value={2} current={currentTab}>
          <MMissionForm
            department_id={department_id}
            data={data?.department_function_function_missions}
          />
        </TabPanel>
        <TabPanel value={3} current={currentTab}>
          <MOrganizationalStructureForm
            department_id={department_id}
            data={data?.department_function_organizational_structures}
          />
        </TabPanel>
        <TabPanel value={4} current={currentTab}>
          <MActiveForm
            department_id={department_id}
            data={data?.department_function_actives}
          />
        </TabPanel>
        <TabPanel value={5} current={currentTab}>
          <MLeadershipForm
            department_id={department_id}
            data={data?.department_function_leadership_through_the_ages}
          />
        </TabPanel>
        <TabPanel value={6} current={currentTab}>
          <MContactForm
            department_id={department_id}
            data={data?.department_function_contacts}
          />
        </TabPanel>
      </div>
    </Stack>
  );
  //#endregion
};
