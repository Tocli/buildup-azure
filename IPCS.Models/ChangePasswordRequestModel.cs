using System;
using System.ComponentModel.DataAnnotations;
using IPCS.Entities;

namespace IPCS.Models
{
    public class ChangePasswordRequestModel : IValidated
    {

		[Required]
		[DataType(DataType.Password)]
		public string OldPassword { get; set; }

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required]
		[DataType(DataType.Password)]
		[Compare("Password")]
		public string ReEnterPassword { get; set; }

        public ChangePasswordRequestModel()
        {
        }
    }
}
