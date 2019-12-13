using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;

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
            using(var context = new StudentsContext(_connectionString))
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
    }
}
