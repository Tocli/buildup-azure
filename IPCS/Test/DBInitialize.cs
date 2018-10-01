using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using IPCS.Entities;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;

namespace IPCS.Test
{
    public class DBInitialize
    {
        public DBInitialize()
        {
        }

        protected static void AddLocations(IPCS.Repositories.Context.IPCSContext context, string address1, string address2)
        {
            if (!context.ProjectLocations.Any())
            {
                context.ProjectLocations.Add(new ProjectLocation
                {
                    Address1 = address1,
                    Address2 = address2,
                    ZipCode = "12213",
                    State = "State",
                    Country = "Country",
                    City = "City"
                });
            }


        }

        protected static void AddProjectInformations(IPCS.Repositories.Context.IPCSContext context)
        {
            if (!context.ProjectInformations.Any())
            {
                context.ProjectInformations.Add(new ProjectInformation
                {
                    ProjectNumber = "001239123",
                    Apsd = DateTime.Now,
                    Opsd = DateTime.Now,
                    OriginalCost = 20000,
                    Npd = DateTime.Now,
                    ProjectName = "Sears Tower",
                    ProjectLocation = context.ProjectLocations.First(),
                    ProjectStatus = context.ProjectStatuses.First(),
                    Budget = context.Budgets.First(),
                    CoordinatesX = "58",
                    CoordinatesY = "58"
                });

                context.ProjectInformations.Add(new ProjectInformation
                {
                    ProjectNumber = "001239123",
                    Apsd = DateTime.Now,
                    Opsd = DateTime.Now,
                    OriginalCost = 20000,
                    Npd = DateTime.Now,
                    ProjectName = "Sears Tower",
                    ProjectLocation = context.ProjectLocations.First(),
                    ProjectStatus = context.ProjectStatuses.First(),
                    Budget = context.Budgets.First(),
                    CoordinatesX = "",
                    CoordinatesY = ""
                });
            }


        }

        protected static void AddProjectStatus(IPCS.Repositories.Context.IPCSContext context)
        {
            if (!context.ProjectStatuses.Any())
            {

                context.ProjectStatuses.Add(new ProjectStatus
                {
                    Name = "In Progress",
                    Description = "In Progress"
                });
                context.ProjectStatuses.Add(new ProjectStatus
                {
                    Name = "Complete",
                    Description = "Complete"
                });
            }
            var status = context.ProjectStatuses.Where(w => w.Name == "In Progress").SingleOrDefault();
            if (status != null)
            {
                status.Name = "On-Going";
                status.Description = "On-Going";
                context.ProjectStatuses.Update(status);
            }

            status = context.ProjectStatuses.Where(w => w.Name == "Complete").SingleOrDefault();
            if (status != null)
            {
                status.Name = "Closed";
                status.Description = "Closed";
                context.ProjectStatuses.Update(status);
            }

            status = context.ProjectStatuses.Where(w => w.Name == "Deleted").SingleOrDefault();
            if (status == null)
            {
                context.ProjectStatuses.Add(new ProjectStatus
                {
                    Name = "Deleted",
                    Description = "Deleted"
                });
            }
        }


        protected static void AddCurrency(IPCS.Repositories.Context.IPCSContext context)
        {
            if (!context.Currencies.Any())
            {
                context.Currencies.Add(new Currency
                {
                    Name = "Dollars",
                    Symbol = "USD"
                });
            }
        }

        protected static void AddCountry(IPCS.Repositories.Context.IPCSContext context, bool seed)
        {
            if (seed)
            {
                var json = File.ReadAllText("./JsonData/countries.json");
                var countries = JsonConvert.DeserializeObject<List<Country>>(json);
                foreach (var country in countries)
                {
                    if (context.Countries.Where(w => w.Code == country.Code).SingleOrDefault() == null)
                    {
                        context.Countries.Add(country);
                    }
                }
            }
            

        }



        protected static void AddState(IPCS.Repositories.Context.IPCSContext context, bool seed)
        {
            if(seed)
            {
                var json = File.ReadAllText("./JsonData/states.json");
                var states = JsonConvert.DeserializeObject<List<State>>(json);
                foreach (var state in states)
                {
                    if (context.States.Where(w => w.Code == state.Code && w.CountryCode == "US").SingleOrDefault() == null)
                    {
                        state.CountryCode = "US";
                        state.ListAvailable = true;
                        context.States.Add(state);
                    }
                }
            }
            
        }

        protected static void AddCity(IPCS.Repositories.Context.IPCSContext context, bool seed)
        {
            if(seed)
            {
                var json = File.ReadAllText("./JsonData/cities.json");
                var cities = JsonConvert.DeserializeObject<List<City>>(json);
                foreach (var city in cities)
                {
                    if (context.Cities.Where(w => w.Code == city.Code && w.StateCode == city.StateCode).SingleOrDefault() == null)
                    {
                        city.ListAvailable = true;
                        context.Cities.Add(city);
                    }
                }
            }
            
        }


        public static void AddActivityType(IPCS.Repositories.Context.IPCSContext context,
            string name, string newName, string descripction, int order, int column, string clazz, int subType)
        {
            var activityType = context.ActivityTypes.Where(w => w.Name == name).SingleOrDefault();
            if (activityType == null)
            {
                activityType = new ActivityType
                {
                };
            }

            activityType.Description = descripction;
            activityType.Class = clazz;
            activityType.Column = column;
            activityType.Order = order;
            activityType.Name = newName;
            activityType.SubType = subType;
            if (activityType.Id == 0)
            {
                context.Add(activityType);
            }
            else
            {
                context.Update(activityType);
            }
        }

        public static void AddSafetyIssues(IPCS.Repositories.Context.IPCSContext context, string name, string newName, int order)
        {
            var safety = context.SafetyIssues.Where(w => w.Name == name).SingleOrDefault();
            if (safety == null)
            {
                safety = new SafetyIssue();
            }

            safety.Name = newName;
            safety.Order = order;
            if (safety.Id == 0)
            {
                context.SafetyIssues.Add(safety);
            }
            else
            {
                context.SafetyIssues.Update(safety);
            }

        }

        public static void AddWeatherConditions(IPCS.Repositories.Context.IPCSContext context, string name, string newName, int order)
        {
            var condition = context.WeatherConditions.Where(w => w.Name == name).SingleOrDefault();
            if (condition == null)
            {
                condition = new WeatherCondition();
            }

            condition.Name = newName;
            condition.Order = order;
            if (condition.Id == 0)
            {
                context.WeatherConditions.Add(condition);
            }
            else
            {
                context.WeatherConditions.Update(condition);
            }

        }


        protected static void AddEntities(IPCS.Repositories.Context.IPCSContext context)
        {
            if (!context.Entities.Any())
            {
                context.Entities.Add(new Entity
                {
                    Name = "Contractor"
                });
                context.Entities.Add(new Entity
                {
                    Name = "Inspector"
                });
                context.Entities.Add(new Entity
                {
                    Name = "Project Manager"
                });
                context.Entities.Add(new Entity
                {
                    Name = "Owner"
                });
                context.Entities.Add(new Entity
                {
                    Name = "Owner's Representative"
                });
                context.Entities.Add(new Entity
                {
                    Name = "Other"
                });
            }
        }

        public static void Seed(IPCS.Repositories.Context.IPCSContext context, UserManager<User> userManager, bool seed)
        {
            context.Database.Migrate();
            AddCurrency(context);
            context.SaveChanges();
            AddProjectStatus(context);
            context.SaveChanges();
            AddCountry(context,seed);
            context.SaveChanges();
            AddState(context, seed);
            context.SaveChanges();
            AddActivityType(context, "Administrative Activities", "Administrative Activities", "No administrative activities", 0, 1, "panel-primary", 1);
            AddActivityType(context, "Construction Activities", "Construction Activities", "No construction activities", 1, 1, "panel-primary", 1);
            AddActivityType(context, "Project Visitors", "Project Visitors", "No project visitors", 2, 1, "panel-primary", 1);
            AddActivityType(context, "Safety", "Safety", "No safety issues", 6, 1, "panel-primary", 4);
            AddActivityType(context, "Critical Path Activities", "Critical Path Activities", "No critical path activities", 7, 1, "panel-primary", 5);
            AddActivityType(context, "Weather", "Weather", "No weather issues", 0, 2, "panel-warning", 3);
            AddActivityType(context, "Pending Issues", "Pending Issues", "No pending issues", 1, 2, "panel-primary", 1);
            AddActivityType(context, "Two Week Look Ahead", "Two Week Look Ahead", "No two week look ahead", 1, 2, "panel-primary", 1);

            AddActivityType(context, "Issues That May Affect Cost", "Issues That May Affect Cost", "No issues that may affect cost", 0, 3, "panel-danger", 2);
            AddActivityType(context, "Issues That Affect Cost", "Issues That Affect Cost", "No issues affecting cost", 1, 3, "panel-danger", 2);
            AddActivityType(context, "Issues That May Affect Schedule", "Issues That May Affect Schedule", "No issues that may affect schedule", 2, 3, "panel-danger", 2);
            AddActivityType(context, "Issues That Affect Schedule", "Issues That Affect Schedule", "No issues affecting schedule", 3, 3, "panel-danger", 2);
            context.SaveChanges();

            AddSafetyIssues(context, "Incident", "Incident", 0);
            AddSafetyIssues(context, "Accident ", "Accident", 1);
            AddSafetyIssues(context, "Near Miss ", "Near Miss", 2);
            context.SaveChanges();

            AddWeatherConditions(context, "Rainy", "Rainy", 0);
            AddWeatherConditions(context, "Sunny", "Sunny", 1);
            AddWeatherConditions(context, "Cloudy", "Cloudy", 2);
            AddWeatherConditions(context, "Stormy", "Stormy", 3);
            AddWeatherConditions(context, "Snowing", "Snowing", 4);
            context.SaveChanges();
            AddEntities(context);
            context.SaveChanges();
            AddCity(context,seed);
            context.SaveChanges();
#if DEBUG
            //AddProjectCertifications(context);
            //context.SaveChanges();
            //AddProjectOrders(context);
            //context.SaveChanges();
            //         AddLocations(context, "New Petersburg IL", "103 Wacker Dr");
            //         context.SaveChanges();
            //         AddBudget(context);
            //         context.SaveChanges();
            //         AddProjectInformations(context);
            //context.SaveChanges();               
#endif


        }
    }
}
