package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Exam;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
}
