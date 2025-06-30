using System.Security.Claims;
using MicroJustice.Data;
using MicroJustice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LegalAnswerController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LegalAnswerController(ApplicationDbContext context) => _context = context;

    [HttpGet("question/{questionId}")]
    public async Task<ActionResult<IEnumerable<LegalAnswer>>> GetAnswers(int questionId)
        => await _context.LegalAnswers.Where(a => a.QuestionId == questionId).ToListAsync();

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PostAnswer([FromBody] LegalAnswer answer)
    {
        answer.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        answer.CreatedAt = DateTime.UtcNow;
        _context.LegalAnswers.Add(answer);
        await _context.SaveChangesAsync();
        return Ok(answer);
    }
}