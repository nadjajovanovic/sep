package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekat.models.Doctor;
import projekat.models.Examtype;
import projekat.service.ExamService;
import projekat.service.ExamTypeService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class ExamTypeController {

    @Autowired
    private ExamTypeService examTypeService;

    @GetMapping("exam-type")
    public Collection<Examtype> getAllExamTypes() {
        final var examTypes = examTypeService.getAll();
        final var listOfExamTypes = examTypes
                .stream()
                .sorted(Comparator.comparingInt(Examtype::getExamtypeid))
                .toList();
        return listOfExamTypes;
    }

    @GetMapping("exam-type/{id}")
    public Optional<Examtype> getExamType(@PathVariable Integer id) {
        final var oneExamType = examTypeService.getOne(id);
        return oneExamType;
    }

    @PostMapping("exam-type")
    public ResponseEntity<Examtype> insertExamType(@RequestBody Examtype examtype) {
        examTypeService.insert(examtype);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("exam-type")
    public ResponseEntity<Examtype> updateExamType(@RequestBody Examtype examtype) {
        examTypeService.update(examtype);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("exam-type/{id}")
    public ResponseEntity<Examtype> deleteDoctor(@PathVariable Integer id) {
        examTypeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
