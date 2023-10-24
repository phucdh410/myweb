import { ITimelineResponse } from '../types';

export interface IMFormModalRef {
  open: (data?: ITimelineResponse) => void;
}

export interface IMFormModalProps {
  departmentId: string;
  refetch: () => void;
}
