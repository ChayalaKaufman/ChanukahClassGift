using System;
using System.Collections.Generic;
using System.Text;

namespace ClassGift.Data
{
    public class CallOrEmail
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public CallOrEmailType Type { get; set; }
        public string Notes { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
