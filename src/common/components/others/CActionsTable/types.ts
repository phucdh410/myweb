import { ReactNode } from 'react';

export interface ICActionsTableProps {
  onEdit: () => void;
  onDelete?: () => void;
  onCreate?: () => void;
  multiLanguages?: boolean;
  otherNode?: ReactNode;
}
