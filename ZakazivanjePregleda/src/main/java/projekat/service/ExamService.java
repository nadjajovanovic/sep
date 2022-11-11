package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Exam;
import projekat.repository.ExamRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public Collection<Exam> getAll(){
        final var exams = examRepository.findAll();
        return exams;
    }

    public Optional<Exam> getOne(Integer id) {
        final var exam = examRepository.findById(id);
        return exam;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Exam insert(Exam exam) {
        final var inserted = examRepository.save(exam);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Exam update(Exam exam) {
        Exam updated = null;
        if (examRepository.existsById(exam.getExamid())) {
            updated = examRepository.save(exam);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(examRepository.existsById(id))
            examRepository.deleteById(id);
        return true;
    }
}
