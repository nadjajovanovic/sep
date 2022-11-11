package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Examtype;

public interface ExamTypeRepository extends JpaRepository<Examtype, Integer> {
}
