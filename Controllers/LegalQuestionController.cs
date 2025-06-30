using System.Security.Claims;
using MicroJustice.Data;
using MicroJustice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MicroJustice.DTOs;

namespace MicroJustice.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LegalQuestionController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LegalQuestionController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/legalquestion
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LegalQuestionDto>>> GetAllQuestions()
    {
        var questions = await _context.LegalQuestions
            .Include(q => q.User)
            .Include(q => q.Answers)
            .ThenInclude(a => a.User)
            .OrderByDescending(q => q.CreatedAt)
            .ToListAsync(); // ✅ Pull from DB first (without APPLY)

        var result = questions.Select(q => new LegalQuestionDto
        {
            Id = q.Id,
            Title = q.Title,
            Category = q.Category,
            Content = q.Content,
            CreatedAt = q.CreatedAt,
            UserId = q.UserId,
            UserName = q.User?.UserName,
            Answers = q.Answers.Select(a => new LegalAnswerDto
            {
                Id = a.Id,
                Content = a.Content,
                CreatedAt = a.CreatedAt,
                UserId = a.UserId,
                UserName = a.User?.UserName
            }).ToList()
        });

        return Ok(result);
    }

    // GET: api/legalquestion/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<LegalQuestionDto>> GetQuestion(int id)
    {
        var q = await _context.LegalQuestions
            .Include(q => q.User)
            .Include(q => q.Answers)
                .ThenInclude(a => a.User)
            .Where(q => q.Id == id)
            .Select(q => new LegalQuestionDto
            {
                Id = q.Id,
                Title = q.Title,
                Category = q.Category,
                Content = q.Content,
                CreatedAt = q.CreatedAt,
                UserId = q.UserId,
                UserName = q.User.UserName,
                Answers = q.Answers.Select(a => new LegalAnswerDto
                {
                    Id = a.Id,
                    Content = a.Content,
                    CreatedAt = a.CreatedAt,
                    UserId = a.UserId,
                    UserName = a.User.UserName,
                    QuestionId = q.Id
                }).ToList()
            })
            .FirstOrDefaultAsync();

        return q == null ? NotFound() : Ok(q);
    }

    // POST: api/legalquestion
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> PostQuestion([FromBody] CreateLegalQuestionDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var question = new LegalQuestion
        {
            Title = dto.Title,
            Category = dto.Category,
            Content = dto.Content,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.LegalQuestions.Add(question);
        await _context.SaveChangesAsync();

        return Ok(new { question.Id });
    }
}
