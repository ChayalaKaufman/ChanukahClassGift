using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClassGift.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ClassGift.Web.Models;

namespace ClassGift.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private string _connectionString;

        public StudentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public IEnumerable<Student> GetAll()
        {
            var repo = new StudentsRepository(_connectionString);
            return repo.GetStudents();
        }

        [HttpPost]
        [Route("addStudent")]
        public void AddStudent(Student student)
        {
            if (student.FirstName == null || student.LastName == null || student.ParentName == null
                || student.Phone == null)
            {
                return;
            }
            var repo = new StudentsRepository(_connectionString);
            repo.AddStudent(student);
            return;
        }

        [HttpPost]
        [Route("addCollection")]
        public void AddCollection(Collection c)
        {
            c.Date = DateTime.Now;
            var repo = new StudentsRepository(_connectionString);
            repo.AddCollection(c);
        }

        [HttpGet]
        [Route("getCollections")]
        public CollectionsViewModel GetCollections(int id)
        {
            var repo = new StudentsRepository(_connectionString);
            CollectionsViewModel cvm = new CollectionsViewModel
            {
                Student = repo.GetStudentById(id),
                Collections = new List<CollectionView>()
            };
            List<Collection> collections = repo.GetCollectionsForId(id);
            collections.ForEach(c =>
            {
                CollectionView cView = new CollectionView
                {
                    Id = c.Id,
                    Notes = c.Notes,
                    Student = c.Student,
                    StudentId = c.StudentId,
                    Date = c.Date.ToString("dddd, dd MMMM yyyy")
                };
                if (c.Type == 0)
                {
                    cView.Type = "Call";
                }
                else
                {
                    cView.Type = "Email";
                }
                cvm.Collections.Add(cView);
            });
            return cvm;
        }

        [HttpPost]
        [Route("addContribution")]
        public void AddContribution(ContributionViewModel cvm)
        {
            var repo = new StudentsRepository(_connectionString);
            repo.AddContributionForStudent(cvm.Id, cvm.ContributionAmount);
            //RedirectToRoute("getall");
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(Student Student)
        {
            var repo = new StudentsRepository(_connectionString);
            repo.Delete(Student.Id);
        }

        [Route("getStudent")]
        [HttpGet]
        public Student GetStudentById(int id)
        {
            var repo = new StudentsRepository(_connectionString);
            return repo.GetStudentById(id);
        }

        [Route("update")]
        [HttpPost]
        public void Update(Student p)
        {
            var repo = new StudentsRepository(_connectionString);
            repo.Update(p);
        }

        [Route("getTotalContributions")]
        [HttpGet]
        public decimal? GetTotalContributions()
        {
            var repo = new StudentsRepository(_connectionString);
            return repo.GetTotalContributions();
        }

        [Route("sendEmail")]
        [HttpPost]
        public string SendEmail(int id)
        {
            var repo = new StudentsRepository(_connectionString);
            Student s = repo.GetStudentById(id);
            var result = repo.SendEmail(s.Email);
            if (result == "Mail has been successfully sent!")
            {
                Collection c = new Collection
                {
                    StudentId = id,
                    Type = CollectionType.Email,
                    Date = DateTime.Now,
                    Notes = "sent scripted email"
                };
                repo.AddCollection(c);
            }
            return result;
        }
    }
}