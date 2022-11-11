package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Doctor;
import projekat.models.State;
import projekat.service.StateService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping("states")
    public Collection<State> getAllStates() {
        final var states = stateService.getAll();
        final var listOfStates = states
                .stream()
                .sorted(Comparator.comparingInt(State::getStateid))
                .toList();
        return listOfStates;
    }

    @GetMapping("states/{id}")
    public Optional<State> getState(@PathVariable Integer id) {
        final var oneState = stateService.getOne(id);
        return oneState;
    }

    @PostMapping("states")
    public ResponseEntity<State> insertState(@RequestBody State state) {
        stateService.insert(state);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("states")
    public ResponseEntity<State> updateState(@RequestBody State state) {
        stateService.update(state);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("states/{id}")
    public ResponseEntity<State> deleteState(@PathVariable Integer id) {
        stateService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
