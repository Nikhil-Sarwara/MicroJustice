using System.Security.Claims;
using MicroJustice.Data;
using MicroJustice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CommentController(ApplicationDbContext context) => _context = context;

    [HttpGet("answer/{answerId}")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int answerId)
        => await _context.Comments.Where(c => c.AnswerId == answerId).ToListAsync();

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PostComment([FromBody] Comment comment)
    {
        comment.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        comment.CreatedAt = DateTime.UtcNow;
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();
        return Ok(comment);
    }
}