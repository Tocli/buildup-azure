using System;
namespace IPCS.Config
{
    public class PasswordOptions
    {

        public bool RequireDigit { get; set; }

        public int RequiredLength { get; set; }

        public bool RequireNonAlphanumeric { get; set; }

        public bool RequireUppercase { get; set; }

        public bool RequireLowercase { get; set; }

        public double DefaultLockoutTimeSpan { get; set; }

        public int MaxFailedAccessAttempts { get; set; }

        public bool RequireUniqueEmail { get; set; }

        public PasswordOptions()
        {
        }
    }
}
