using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IPCS.Generic.Repositories.Paginators;


namespace IPCS.Generic.Repositories
{
    public abstract class GenericRepository<TEntity>  : IGenericRepository<TEntity> where TEntity :class
    {
        protected DbContext dbContext;

        protected DbSet<TEntity> dbSet;

        public GenericRepository(DbContext dbContext)
        {
            this.dbSet = dbContext.Set<TEntity>();
            this.dbContext = dbContext;
        }

        public virtual void Delete(object id)
        {
            dbSet.Remove(dbSet.Find(id));
            dbContext.SaveChanges();
        }

		public virtual void DeleteAll(object[] ids)
		{
            foreach (var item in ids)
            {
                dbSet.RemoveRange(dbSet.Find(item));
            }

			dbContext.SaveChanges();
		}

        public virtual TEntity Get(object id)
        {
            return dbSet.Find(id);
        }

        public virtual TEntity Insert(TEntity entity)
        {
            var result = dbSet.Add(entity).Entity;
            dbContext.SaveChanges();
            return result;
        }

		public virtual void InsertAll(List<TEntity> list)
		{
            dbSet.AddRange(list);
			dbContext.SaveChanges();
		}

        public virtual TEntity Update(TEntity entity)
        {
            var result = dbSet.Update(entity);
            dbContext.SaveChanges();
            return result.Entity;
		}

		public virtual void UpdateAll(List<TEntity> list)
		{
			dbSet.UpdateRange(list);
			dbContext.SaveChanges();
		}

        public virtual async Task<List<TEntity>> List(){
            return await dbSet.ToListAsync<TEntity>();
        }

        public virtual Paginator<TEntity> List(int page,int rowsPage)
		{            
            return new Paginator<TEntity>
            {
                Result = dbSet.Skip<TEntity>(page * rowsPage).Take<TEntity>(rowsPage).ToList<TEntity>(),
                TotalRow = dbSet.Count<TEntity>()
            };            
		}

		~GenericRepository()
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
                dbContext.Dispose();
			}
			// dispose the unmanaged objects
		}
    }
}
