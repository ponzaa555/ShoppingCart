using System.Collections;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _repository;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }
        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            // check have anything in hashTable
            if(_repository == null) _repository = new Hashtable();

            // Get type of entity
            var type = typeof(TEntity).Name; 

           // check hash table have entity name
           if(!_repository.ContainsKey(type))
           {
                var repositoryType = typeof(GenericRepository<>);
                // create instance of repository
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(
                    typeof(TEntity)), _context);

                // Add repository ไปใน hashTable โดย key เป็นชื่อตรางเช่น Product : IGenericRepository<Product>
                _repository.Add(type , repositoryInstance);
           } 

           return (IGenericRepository<TEntity>) _repository[type];
        }
    }
}