using System;
using System.Collections.Generic;
namespace IPCS.Models
{
    public class PaginatorResponseModel<T> where T : class
	{

        public List<T> ResultList { get; set; }

        public int TotalRows { get; set; }

        public PaginatorResponseModel()
        {
        }
    }
}
