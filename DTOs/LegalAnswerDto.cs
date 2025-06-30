namespace MicroJustice.DTOs;

public class LegalAnswerDto
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string Content { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public DateTime CreatedAt { get; set; }
}