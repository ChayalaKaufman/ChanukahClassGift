using ClassGift.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassGift.Web.Models
{
    public class CallsOrEmailsViewModel
    {
        public List<CallOrEmail> CallsOrEmails { get; set; }
        public Student Student { get; set; }
    }
}
