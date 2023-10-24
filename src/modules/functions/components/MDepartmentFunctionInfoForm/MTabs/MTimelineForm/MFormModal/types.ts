import { ITimelineResponse } from '../types';

export interface IMFormModalRef {
  open: (data?: ITimelineResponse) => void;
}

export interface IMFormModalProps {
  department_id: string;
  refetch: () => void;
}
