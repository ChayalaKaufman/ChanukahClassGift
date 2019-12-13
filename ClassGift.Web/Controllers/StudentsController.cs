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
        public Student AddStudent(Student student)
        {
            var repo = new StudentsRepository(_connectionString);
            repo.AddStudent(student);
            return student;
        }

        [HttpPost]
        [Route("addCollection")]
        public Collection AddCollection(Collection c)
        {
            c.Date = DateTime.Now;
            var repo = new StudentsRepository(_connectionString);
            repo.AddCollection(c);
            return c;
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
    }
}