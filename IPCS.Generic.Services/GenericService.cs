using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IPCS.Models;
using IPCS.Generic.Repositories;

namespace IPCS.Generic.Services
{
    public abstract class GenericService<T> : IGenericService<T> where T : class
    {
        protected IGenericRepository<T> genericRepository;

        public GenericService(IGenericRepository<T> genericRepository)
        {
            this.genericRepository = genericRepository;
        }

        public void Delete(object id)
        {
            genericRepository.Delete(id);
        }

        public T Get(object id)
        {
            return genericRepository.Get(id);
        }

        public T Insert(T entity)
        {
            return genericRepository.Insert(entity);
        }

        public T Update(T entity)
        {
			return genericRepository.Update(entity);
		}

        public async Task<List<T>> List()
        {
            return await genericRepository.List();
        }

        public PaginatorResponseModel<T> List(PaginatorRequestModel requestModel)
        {
            var paginator = genericRepository.List(requestModel.Page, requestModel.RowsPage);
            return new PaginatorResponseModel<T>
            {
                ResultList = paginator.Result,
                TotalRows = paginator.TotalRow
            };
        }

        ~GenericService()
		{
			Dispose(false);
		}

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
			// This method will remove current object from garbage collector's queue 
			// and stop calling finilize method twice 
		}

		public void Dispose(bool disposer)
		{
			if (disposer)
			{
				// dispose the managed objects
                genericRepository.Dispose();
			}
			// dispose the unmanaged objects
		}

        public void DeleteAll(object[] ids)
        {
            genericRepository.DeleteAll(ids);
        }

        public void UpdateAll(List<T> list)
        {
            genericRepository.UpdateAll(list);
        }

        public void InsertAll(List<T> list)
        {
            genericRepository.InsertAll(list);
        }
    }
}
