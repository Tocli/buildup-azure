import {IProjectActivity} from './iproject-activity';
import {ISafetyIssue} from './isafety-issue';

export interface IProjectSafety extends IProjectActivity {
  activityId: number;
  safetyId: number;
  safetyIssue: ISafetyIssue;
}
