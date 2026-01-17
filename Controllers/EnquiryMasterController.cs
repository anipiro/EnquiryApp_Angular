using Enquiry.API.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Enquiry.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowCors")]
    public class EnquiryMasterController : ControllerBase
    {
        private readonly EnquiryDbContext _context;
        public EnquiryMasterController(EnquiryDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetAllStatus")]
        public List<EnquiryStatus> GetAllStatus()
        {
            var list = _context.EnquiryStatus.ToList();
            return list;
        }
        [HttpGet("GetAllTypes")]
        public List<EnquiryType> GetAllTypes()
        {
            var list = _context.EnquiryType.ToList();
            return list;
        }
        [HttpGet("GetAllEnquiries")]
        public List<EnquiryModel> GetAllEnquiry()
        {
            var list = _context.EnquiryModel.ToList();
            return list;
        }
        [HttpPut("UpdateEnquiry")]
        public EnquiryModel Update(EnquiryModel obj)
        {
            var record = _context.EnquiryModel.SingleOrDefault(m => m.enquiryId == obj.enquiryId);
            if(record != null)
            {
                record.resolution = obj.resolution;
                record.enquiryStatusId = obj.enquiryStatusId;
                _context.SaveChanges();
            }
            return obj;
        }
        [HttpDelete("DeleteEnquiryById")]
        public bool DeleteEnquiryById(int id)
        {
            var record = _context.EnquiryModel.SingleOrDefault(m => m.enquiryId == id);
            if (record != null)
            {
                _context.EnquiryModel.Remove(record);
                _context.SaveChanges();
                return true;
            }
            else { 
                return false;
            }
        }
       
        [HttpPost("CreateEnquiry")]
        public EnquiryModel CreateEnquiry([FromBody] EnquiryModel obj)
        {
            _context.EnquiryModel.Add(obj);
            _context.SaveChanges();
            return obj;
        }

    }
}
