using MicroJustice.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context) => _context = context;

    [HttpPut("verify-lawyer/{userId}")]
    public async Task<IActionResult> VerifyLawyer(string userId)
    {
        var profile = await _context.UserProfiles.FindAsync(userId);
        if (profile == null) return NotFound();

        profile.IsVerifiedLawyer = true;
        await _context.SaveChangesAsync();
        return Ok(profile);
    }
}