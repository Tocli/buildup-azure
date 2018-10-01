using IPCS.Entities;
using IPCS.Generic.Services;
using IPCS.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace IPCS.Services
{
    public class SafetyIssueService : GenericService<SafetyIssue>, ISafetyIssueService
    {
        public SafetyIssueService(ISafetyIssueRepository safetyIssueRepository) : base(safetyIssueRepository)
        {

        }
    }
}
