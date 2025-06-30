using MicroJustice.Data;
using MicroJustice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserProfileController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string id)
    {
        var profile = await _context.UserProfiles.FindAsync(id);
        return profile == null ? NotFound() : Ok(profile);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfile(string id, [FromBody] UserProfile profileData)
    {
        if (id != profileData.Id) return BadRequest();
        _context.Entry(profileData).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}