using System.Security.Claims;
using MicroJustice.Data;
using MicroJustice.DTOs;
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
    {
        return await _context.LegalAnswers
            .Where(a => a.QuestionId == questionId)
            .Include(a => a.Comments)
            .ToListAsync();
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PostAnswer([FromBody] CreateLegalAnswerDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    
        var answer = new LegalAnswer
        {
            QuestionId = dto.QuestionId,
            Content = dto.Content,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.LegalAnswers.Add(answer);
        await _context.SaveChangesAsync();
        return Ok(answer);
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnswer(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var answer = await _context.LegalAnswers.FindAsync(id);

        if (answer == null) return NotFound();
        if (answer.UserId != userId) return Forbid();

        _context.LegalAnswers.Remove(answer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}