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
        [Route("addCallOrEmail")]
        public void AddCallOrEmail(CallOrEmail c)
        {
            c.Date = DateTime.Now;
            var repo = new StudentsRepository(_connectionString);
            repo.AddCallOrEmail(c);
        }

        [HttpGet]
        [Route("getCallsOrEmails")]
        public CallsOrEmailsViewModel GetCallsOrEmails(int id)
        {
            var repo = new StudentsRepository(_connectionString);
            CallsOrEmailsViewModel cvm = new CallsOrEmailsViewModel
            {
                Student = repo.GetStudentById(id),
                CallsOrEmails = repo.GetCallsOrEmailsForId(id)
            };
            return cvm;
        }

        [HttpPost]
        [Route("addContribution")]
        public void AddContribution(ContributionViewModel cvm)
        {
            var repo = new StudentsRepository(_connectionString);
            repo.AddContributionForStudent(cvm.Id, cvm.ContributionAmount);
        }

        [Route("getStudent")]
        [HttpGet]
        public Student GetStudentById(int id)
        {
            var repo = new StudentsRepository(_connectionString);
            return repo.GetStudentById(id);
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
                CallOrEmail c = new CallOrEmail
                {
                    StudentId = id,
                    Type = CallOrEmailType.Email,
                    Date = DateTime.Now,
                    Notes = "sent automatic email"
                };
                repo.AddCallOrEmail(c);
            }
            return result;
        }
    }
}