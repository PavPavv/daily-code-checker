import { BasicInfoError } from './basic-info-error.model';
import { IGitUser } from './user.model';

export interface IBasicInfoState {
  basicInfo: IGitUser | null;
  isLoading: boolean;
  error: BasicInfoError | null;
}