package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Examtype;
import projekat.repository.ExamTypeRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExamTypeService {

    @Autowired
    private ExamTypeRepository examTypeRepository;

    public Collection<Examtype> getAll(){
        final var examTypes = examTypeRepository.findAll();
        return examTypes;
    }

    public Optional<Examtype> getOne(Integer id) {
        final var examType = examTypeRepository.findById(id);
        return examType;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Examtype insert(Examtype examtype) {
        final var inserted = examTypeRepository.save(examtype);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Examtype update(Examtype examtype) {
        Examtype updated = null;
        if (examTypeRepository.existsById(examtype.getExamtypeid())) {
            updated = examTypeRepository.save(examtype);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(examTypeRepository.existsById(id))
            examTypeRepository.deleteById(id);
        return true;
    }
}
