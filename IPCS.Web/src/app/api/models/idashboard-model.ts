export interface IdashboardModel {

  projectName: string;
  projectLastUpdate: string;
  percentBudgetProjectCost: number;
  projectEstimatedInitialCost: number;
  projectRealCost: number;
  projectRealCostVsProjectEstimateCostPercentage: string;
  projectEndDate: string;
  OverallStatusCost: boolean;
  OverallStatusSchedule: boolean;
  OverallStatusRisk: boolean;
  OverallStatusSafety: boolean;
  CostSectionOriginalProjectCost: number;
  CostSectionTotalChangeOrderToDate: number;
  CostSectionChangeOrdersPercent: number;
  CostSectionRevisedCostToDate: number;
  CostSectionTotalCertifiedToDate: number;
  CostSectionTotalRetainedAmountToDate: number;
  CostSectionCertifiedPercentageToDate: number;
  CostSectionTotalPaidToDate: number;
  CostSectionLastUpdateOfChangeOrders: string;

  CostIssuesPanelHeading: string;

  ScheduleSectionOriginalContractDuration: number;
  ScheduleSectionOriginalConstructionDuration: number;
  ScheduleSectionNTP: string;
  ScheduleSectionOriginalProjectStartDate: string;
  ScheduleSectionRevisedProjectStartDate: string;
  ScheduleSectionOriginalProjectEndDate: string;
  ScheduleSectionRevisedProjectEndDate: string;
  ScheduleSectionCostTimeExtensionDueToChangeOrders: string;
  ScheduleSectionOriginalSubstantialCompletionDate: string;
  ScheduleSectionRevisedSubstantialCompletionDate: string;
  ScheduleSectionDaysConsumedSinceProjectStartDate: number;
  ScheduleSectionTimePercentConsumedSinceProjectStartDate: number;
  ScheduleSectionContractTimeExtensionDueToChangeOrders: number;
  ScheduleSectionNewContractDuration: number;

  htmlProjectDayleReportDescription: string;
  htmlProjectDayleReportStarTime: string;
  htmlProjectDayleReportEndTime: string;
  htmlProjectDayleReportDiscriminator: string;

  lastModifyOfCriticalPathActivites: string;

}
