using System;

namespace IPCS.Models
{
    public class PaginatorRequestModel
    {
        public int RowsPage { get; set; }

        public int Page { get; set; }

        public string OrderProperty { get; set; }

        public bool Desc { get; set; }

        public PaginatorRequestModel()
        {
        }
    }
}
