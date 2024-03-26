﻿using backend_v2.Models;

namespace backend_v2.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsPaginated(int pageNum, int recordsPerPage);        
        Task<IEnumerable<Product>> GetBestSellers();
        Task<int> GetAllProductsCount();
        Task<int> GetProductsCountByCategory(string categoryName);
        Task<IEnumerable<Product>> GetProductsByCategoryPaginated(string categoryName, int pageNum, int recordsPerPage);

        Task<Product> GetProductById(string productId);
    }
}