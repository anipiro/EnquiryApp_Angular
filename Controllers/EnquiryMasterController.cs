using Enquiry.API.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Enquiry.API.Controllers
{
    [ApiController]
    [Route("api/enquiries")]
    [EnableCors("AllowCors")]
    public class EnquiryMasterController(EnquiryDbContext context) : ControllerBase
    {
        [HttpGet("statuses")]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await context.EnquiryStatus.ToListAsync();
            return Ok(statuses);
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetTypes()
        {
            var types = await context.EnquiryType.ToListAsync();
            return Ok(types);
        }

        [HttpGet]
        public async Task<IActionResult> GetEnquiries()
        {
            var enquiries = await context.EnquiryModel.ToListAsync();
            return Ok(enquiries);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEnquiry([FromBody] EnquiryModel enquiry)
        {
            context.EnquiryModel.Add(enquiry);
            await context.SaveChangesAsync();

            return Created($"/api/enquiries/{enquiry.EnquiryId}", enquiry);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateEnquiry(int id, [FromBody] EnquiryModel enquiry)
        {
            var record = await context.EnquiryModel.FirstOrDefaultAsync(m => m.EnquiryId == id);
            if (record is null)
            {
                return NotFound();
            }

            record.Resolution = enquiry.Resolution;
            record.EnquiryStatusId = enquiry.EnquiryStatusId;
            await context.SaveChangesAsync();

            return Ok(record);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEnquiry(int id)
        {
            var record = await context.EnquiryModel.FirstOrDefaultAsync(m => m.EnquiryId == id);
            if (record is null)
            {
                return NotFound();
            }

            context.EnquiryModel.Remove(record);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
