using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)       
    {        
        this.ChangeTracker.LazyLoadingEnabled = false;
    }

    public DbSet<User> users { get; set; }
    public DbSet<Event> events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.EventsSubscribed)
            .WithMany(e => e.Users);

        modelBuilder.Entity<User>()
            .HasMany(u => u.EventsCreated)
            .WithOne(e => e.Author);
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
    }
}
