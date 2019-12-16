﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Net;

namespace ClassGift.Data
{
    public class StudentsRepository
    {
        private string _connectionString;

        public StudentsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<Student> GetStudents()
        {
            using (var context = new StudentsContext(_connectionString))
            {
                return context.Students.ToList();
            }
        }

        public void AddStudent(Student Student)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                context.Students.Add(Student);
                context.SaveChanges();
            }
        }

        public void AddContributionForStudent(int id, decimal amount)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                Student student = context.Students.FirstOrDefault(s => s.Id == id);
                student.ContributionAmount = amount;
                context.SaveChanges();
            }

        }

        public void Delete(int id)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "DELETE FROM Students WHERE Id = @id",
                    new SqlParameter("@id", id));
            }
        }

        public Student GetStudentById(int id)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                return context.Students.FirstOrDefault(s => s.Id == id);
            }
        }

        public List<Collection> GetCollectionsForId(int id)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                return context.Collections.Where(c => c.StudentId == id).ToList();
            }
        }

        public void Update(Student p)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                context.Students.Attach(p);
                context.Entry(p).State = EntityState.Modified;
                context.SaveChanges();
            }

        }

        public void AddCollection(Collection c)
        {
            using (var context = new StudentsContext(_connectionString))
            {
                context.Collections.Add(c);
                context.SaveChanges();
            }
        }
        public decimal? GetTotalContributions()
        {
            using (var context = new StudentsContext(_connectionString))
            {
                return context.Students.Sum(s => s.ContributionAmount);
            }
        }

        public string SendEmail(string email)
        {
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress("programmer1129@gmail.com");
            msg.To.Add(email);
            msg.Subject = "Class Chanukah Gift";
            msg.Body = "We are trying to collect money for a Chanukah gift for the teacher. Please " +
                "call me at 732-674-0491 or send money with your child to school. Thanks!";
            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Credentials = new NetworkCredential("programmer1129@gmail.com", "ckma1lck");
            client.Timeout = 20000;
            try
            {
                client.Send(msg);
                return "Mail has been successfully sent!";
            }
            catch (Exception ex)
            {
                return "Fail. Has error" + ex.Message;
            }
            finally
            {
                msg.Dispose();
            }
        }
    }
}
