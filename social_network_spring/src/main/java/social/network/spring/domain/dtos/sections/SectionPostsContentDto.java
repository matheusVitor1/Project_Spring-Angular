package social.network.spring.domain.dtos.sections;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Builder
@Getter
@Setter
public class SectionPostsContentDto {
    private Long id;
    private String content;
    private String date;
    private Long userId;
}
