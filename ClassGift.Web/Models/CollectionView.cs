using ClassGift.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassGift.Web.Models
{
    public class CollectionView
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string Notes { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
