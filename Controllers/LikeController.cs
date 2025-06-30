using System.Security.Claims;
using MicroJustice.Data;
using MicroJustice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LikeController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LikeController(ApplicationDbContext context) => _context = context;

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> LikeAnswer([FromBody] Like like)
    {
        like.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        _context.Likes.Add(like);
        await _context.SaveChangesAsync();
        return Ok(like);
    }

    [Authorize]
    [HttpDelete("{answerId}")]
    public async Task<IActionResult> Unlike(int answerId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var like = await _context.Likes
            .FirstOrDefaultAsync(l => l.AnswerId == answerId && l.UserId == userId);
        if (like == null) return NotFound();

        _context.Likes.Remove(like);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}