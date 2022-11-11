package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Insurance;
import projekat.repository.InsuranceRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class InsuranceService {

    @Autowired
    private InsuranceRepository insuranceRepository;

    public Collection<Insurance> getAll(){
        final var insurances = insuranceRepository.findAll();
        return insurances;
    }

    public Optional<Insurance> getOne(Integer id) {
        final var insurance = insuranceRepository.findById(id);
        return insurance;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Insurance insert(Insurance insurance) {
        final var inserted = insuranceRepository.save(insurance);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Insurance update(Insurance insurance) {
        Insurance updated = null;
        if (insuranceRepository.existsById(insurance.getInsuranceid())) {
            updated = insuranceRepository.save(insurance);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(insuranceRepository.existsById(id))
            insuranceRepository.deleteById(id);
        return true;
    }
}
