using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace IPCS.Repositories
{
    public class SafetyIssueRepository : GenericRepository<SafetyIssue>, ISafetyIssueRepository
    {
        public SafetyIssueRepository(IPCSContext context) : base(context)
        {

        }
    }
}
