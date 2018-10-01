using System;
using System.Collections.Generic;

namespace IPCS.Generic.Repositories.Paginators
{
    public class Paginator<TEntity> where TEntity : class
	{
        public List<TEntity> Result { get; set; }

        public int TotalRow { get; set; }

        public Paginator()
        {
        }
    }
}
