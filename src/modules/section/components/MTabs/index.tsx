import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Divider, styled, Tab, Tabs } from '@mui/material';

import { queryStringToObject } from '@/funcs/';
import { useNavigateQuery } from '@/hooks/';
import { ICreateOrUpdateContactParams } from '@/types/contact';
import { IGetDepartmentDetailResponse } from '@/types/departments';
import { ICreateOrUpdateEducationQualityParams } from '@/types/education-quality';
import { ICreateOrUpdateIntroduceParams } from '@/types/introduce';
import { ICreateOrUpdateLecturerQualityParams } from '@/types/lecturer-quality';

import {
  contactResolver,
  defaultContactValues,
  defaultIntroduceValues,
  defaultLecturerQualityValues,
  introduceResolver,
  lecturerQualityResolver,
} from '../../form';
import {
  defaultEducationQualityValues,
  educationQualityResolver,
} from '../../form/education-quality';
import {
  MActiveForm,
  MIntroduceForm,
  MLeadershipForm,
  MLecturerQualityForm,
  MOrganizationalStructureForm,
  MSubjectForm,
  MTimelineForm,
  MTrainingGoalForm,
  MTrainingSectorForm,
} from '../MTabSubComponents';
import { MContactForm } from '../MTabSubComponents/MContactForm';
import { MEducationQualityForm } from '../MTabSubComponents/MEducationQualityForm';

const TABS = [
  { id: '0', value: 0, label: 'Giới thiệu' },
  { id: '1', value: 1, label: 'Timeline' },
  { id: '2', value: 2, label: 'Chất lượng đào tạo' },
  { id: '3', value: 3, label: 'Chất lượng giảng viên' },
  { id: '4', value: 4, label: 'Mục tiêu đào tạo' },
  { id: '5', value: 5, label: 'Các ngành đào tạo' },
  { id: '6', value: 6, label: 'Cơ cấu tổ chức' },
  { id: '7', value: 7, label: 'Giảng viên bộ môn' },
  { id: '8', value: 8, label: 'Hoạt động' },
  { id: '9', value: 9, label: 'Lãnh đạo qua các thời kỳ' },
  { id: '10', value: 10, label: 'Liên hệ' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  current: number;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTabs-root': {
    maxWidth: 1000,
  },
  '.MuiTabs-flexContainer': {
    display: 'grid',
    gridTemplateColumns: 'repeat(6,auto)',
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
export interface IMTabsrops {
  departmentId: string;
  data?: IGetDepartmentDetailResponse;
}

export const MTabs = ({ departmentId, data }: IMTabsrops) => {
  //#region Data
  const location = useLocation();
  const { navigateWithNewQuery } = useNavigateQuery();
  const queryParams = queryStringToObject(location.search);

  const [currentTab, setCurrentTab] = useState<number>(
    Number(queryParams?.tab) || 0,
  );

  const {
    control: introduceControl,
    handleSubmit: introduceSubmit,
    reset: introduceReset,
    formState: {
      isDirty: isIntroduceDirty,
      isSubmitting: isIntroduceSubmiting,
    },
  } = useForm<ICreateOrUpdateIntroduceParams>({
    mode: 'all',
    resolver: introduceResolver,
    defaultValues: defaultIntroduceValues,
  });

  const {
    control: educationQualityControl,
    handleSubmit: educationQualitySubmit,
    reset: educationQualityReset,
    formState: {
      isDirty: isEducationQualityDirty,
      isSubmitting: isEducationQualitySubmiting,
    },
  } = useForm<ICreateOrUpdateEducationQualityParams>({
    mode: 'all',
    resolver: educationQualityResolver,
    defaultValues: defaultEducationQualityValues,
  });

  const {
    control: lecturerQualityControl,
    handleSubmit: lecturerQualitySubmit,
    reset: lecturerQualityReset,
    formState: {
      isDirty: isLecturerQualityDirty,
      isSubmitting: isLecturerQualitySubmiting,
    },
  } = useForm<ICreateOrUpdateLecturerQualityParams>({
    mode: 'all',
    resolver: lecturerQualityResolver,
    defaultValues: defaultLecturerQualityValues,
  });

  const {
    control: contactControl,
    handleSubmit: contactSubmit,
    reset: contactReset,
    formState: { isDirty: isContactDirty, isSubmitting: isContactSubmiting },
  } = useForm<ICreateOrUpdateContactParams>({
    mode: 'all',
    resolver: contactResolver,
    defaultValues: defaultContactValues,
  });
  //#endregion

  //#region Event
  useEffect(() => {
    if (data && departmentId) {
      introduceReset({
        department_name: data?.department_introduces?.department_name,
        slogan: data?.department_introduces?.slogan,
        content: data?.department_introduces?.content,
      });
      educationQualityReset(data?.department_education_qualitys);
      lecturerQualityReset({
        content: data?.department_lecturer_qualitys?.content,
        description: data?.department_lecturer_qualitys?.description,
      });
      // trainingGoalReset({
      //   content: data?.department_training_goals?.content,
      //   description: data?.department_training_goals?.description,
      // });
      contactReset({
        content: data?.department_contacts?.content,
      });
    }
  }, [data, departmentId]);

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
    <>
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
            departmentId={departmentId}
            data={data?.department_introduces}
            form={{
              control: introduceControl,
              handleSubmit: introduceSubmit,
              reset: introduceReset,
              isDirty: isIntroduceDirty,
              isSubmitting: isIntroduceSubmiting,
            }}
          />
        </TabPanel>
        <TabPanel value={1} current={currentTab}>
          <MTimelineForm
            departmentId={departmentId}
            data={data?.department_timelines}
          />
        </TabPanel>
        <TabPanel value={2} current={currentTab}>
          <MEducationQualityForm
            departmentId={departmentId}
            data={data?.department_education_qualitys}
            form={{
              control: educationQualityControl,
              handleSubmit: educationQualitySubmit,
              reset: educationQualityReset,
              isDirty: isEducationQualityDirty,
              isSubmitting: isEducationQualitySubmiting,
            }}
          />
        </TabPanel>
        <TabPanel value={3} current={currentTab}>
          <MLecturerQualityForm
            departmentId={departmentId}
            data={data?.department_lecturer_qualitys}
            form={{
              control: lecturerQualityControl,
              handleSubmit: lecturerQualitySubmit,
              reset: lecturerQualityReset,
              isDirty: isLecturerQualityDirty,
              isSubmitting: isLecturerQualitySubmiting,
            }}
          />
        </TabPanel>
        <TabPanel value={4} current={currentTab}>
          <MTrainingGoalForm
            departmentId={departmentId}
            data={data?.department_training_goals}
          />
        </TabPanel>
        <TabPanel value={5} current={currentTab}>
          <MTrainingSectorForm
            departmentId={departmentId}
            data={data?.department_training_sectors}
          />
        </TabPanel>
        <TabPanel value={6} current={currentTab}>
          <MOrganizationalStructureForm
            departmentId={departmentId}
            data={data?.department_organizational_structures}
          />
        </TabPanel>
        <TabPanel value={7} current={currentTab}>
          <MSubjectForm
            departmentId={departmentId}
            data={data?.department_subjects}
          />
        </TabPanel>
        <TabPanel value={8} current={currentTab}>
          <MActiveForm
            departmentId={departmentId}
            data={data?.department_actives}
          />
        </TabPanel>
        <TabPanel value={9} current={currentTab}>
          <MLeadershipForm
            departmentId={departmentId}
            data={data?.department_leadership_through_the_ages}
          />
        </TabPanel>
        <TabPanel value={10} current={currentTab}>
          <MContactForm
            departmentId={departmentId}
            data={data?.department_contacts}
            form={{
              control: contactControl,
              handleSubmit: contactSubmit,
              reset: contactReset,
              isDirty: isContactDirty,
              isSubmitting: isContactSubmiting,
            }}
          />
        </TabPanel>
      </div>
    </>
  );
  //#endregion
};
