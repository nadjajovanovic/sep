package projekat.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import projekat.models.Doctor;
import projekat.models.State;
import projekat.repository.StateRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public Collection<State> getAll(){
        final var states = stateRepository.findAll();
        return states;
    }

    public Optional<State> getOne(Integer id) {
        final var state = stateRepository.findById(id);
        return state;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public State insert(State state) {
        final var inserted = stateRepository.save(state);
        return inserted;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public State update(State state) {
        State updated = null;
        if (stateRepository.existsById(state.getStateid())) {
            updated = stateRepository.save(state);
        }
        return updated;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean delete(Integer id) {
        if(stateRepository.existsById(id))
            stateRepository.deleteById(id);
        return true;
    }
}
