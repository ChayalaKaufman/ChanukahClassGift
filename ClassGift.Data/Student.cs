using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClassGift.Data
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string ParentName { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Email { get; set; }
        public decimal? ContributionAmount { get; set; }
        public List<CallOrEmail> CallsOrEmails { get; set; }
    }
}
