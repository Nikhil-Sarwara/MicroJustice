using System.ComponentModel.DataAnnotations;

namespace MicroJustice.Models;

public class UserProfile {
    [Key]
    public string Id { get; set; } // FK to AspNetUsers
    public string FullName { get; set; }
    public string Bio { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string Location { get; set; }
    public bool IsVerifiedLawyer { get; set; }
    public string Specialization { get; set; }

    public virtual ApplicationUser User { get; set; }
}