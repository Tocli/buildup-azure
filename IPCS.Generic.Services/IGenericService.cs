using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IPCS.Models;

namespace IPCS.Generic.Services
{
    public interface IGenericService<T> : IDisposable where T : class
    {
        T Get(object id);

        void Delete(object id);

        void DeleteAll(object[] ids);

        T Update(T entity);

        void UpdateAll(List<T> entity);

        T Insert(T entity);

        void InsertAll(List<T> list);

        Task<List<T>> List();

        PaginatorResponseModel<T> List(PaginatorRequestModel requestModel);
    }
}
