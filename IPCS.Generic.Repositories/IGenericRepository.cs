using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IPCS.Generic.Repositories.Paginators;

namespace IPCS.Generic.Repositories
{
    public interface IGenericRepository<TEntity> : IDisposable where TEntity : class 
    {
        void Delete(object id);

        void DeleteAll(object[] ids);

        TEntity Get(object id);

        TEntity Insert(TEntity entity);

        void InsertAll(List<TEntity> list);

        TEntity Update(TEntity entity);

        void UpdateAll(List<TEntity> list);

        Task<List<TEntity>> List();

        Paginator<TEntity> List(int page, int rowsPage);
		
    }
}
