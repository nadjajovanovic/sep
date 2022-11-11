package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Appoitment;
import projekat.repository.AppoitmentRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppoitmentService {

    @Autowired
    private AppoitmentRepository appoitmentRepository;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Collection<Appoitment> getAll(){
        final var appoitments = appoitmentRepository.findAll();
        return appoitments;
    }

    public Optional<Appoitment> getOne(Integer id) {
        final var appoitment = appoitmentRepository.findById(id);
        return appoitment;
    }

    @PreAuthorize("hasRole('USER')")
    public Appoitment insert(Appoitment appoitment) {
        final var inserted = appoitmentRepository.save(appoitment);
        return inserted;
    }

    @PreAuthorize("hasRole('USER')")
    public Appoitment update(Appoitment appoitment) {
        Appoitment updated = null;
        if (appoitmentRepository.existsById(appoitment.getAppoitmentid())) {
            updated = appoitmentRepository.save(appoitment);
        }
        return updated;
    }

    @PreAuthorize("hasRole('USER')")
    public boolean delete(Integer id) {
        if(appoitmentRepository.existsById(id))
            appoitmentRepository.deleteById(id);
        return true;
    }
}
