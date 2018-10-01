using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Generic.Repositories;
using IPCS.Entities;

namespace IPCS.Repositories
{
    public interface ICityRepository :  IGenericRepository<City>
    {
        List<City> ListCityBySate(string cityCode);
    }
}
