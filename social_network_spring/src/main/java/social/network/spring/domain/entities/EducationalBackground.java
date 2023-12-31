package social.network.spring.domain.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class EducationalBackground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String course;

    @Column (nullable = false)
    private String degree;

    @Column (nullable = false)
    private String institution;

    @Column (nullable = false)
    private String startYear;

    @Column (nullable = false)
    private String endYear;

    @Lob
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public EducationalBackground() {

    }

    public EducationalBackground(String course, String degree, String institution, String startYear, String endYear, String description, User user) {
        this.course = course;
        this.degree = degree;
        this.institution = institution;
        this.startYear = startYear;
        this.endYear = endYear;
        this.description = description;
        this.user = user;
    }
}
