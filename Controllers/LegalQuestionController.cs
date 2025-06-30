using System.Security.Claims;
using MicroJustice.Data;
using MicroJustice.DTOs;
using MicroJustice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LegalQuestionController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public LegalQuestionController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LegalQuestion>>> GetAllQuestions()
    {
        var questions = await _context.LegalQuestions
            .OrderByDescending(q => q.CreatedAt)
            .ToListAsync();

        return Ok(questions);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<LegalQuestion>> GetQuestion(int id)
    {
        var question = await _context.LegalQuestions.FindAsync(id);
        return question == null ? NotFound() : Ok(question);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PostQuestion([FromBody] CreateLegalQuestionDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var q = new LegalQuestion
        {
            Title = dto.Title,
            Category = dto.Category,
            Content = dto.Content,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.LegalQuestions.Add(q);
        await _context.SaveChangesAsync();

        return Ok(q);
    }
}