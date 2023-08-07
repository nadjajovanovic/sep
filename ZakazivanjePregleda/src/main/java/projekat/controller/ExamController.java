package projekat.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import projekat.models.Exam;
import projekat.security.jwt.JwtUtils;
import projekat.security.services.UserDetailsImpl;
import projekat.service.ExamService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("exams")
    public Collection<Exam> getAllExams() {
        final var exams = examService.getAll();
        final var listOfExams = exams
                .stream()
                .sorted(Comparator.comparingInt(Exam::getExamid))
                .toList();
        return listOfExams;
    }

    @GetMapping("exams/{id}")
    public Optional<Exam> getExam(@PathVariable Integer id) {
        final var oneExam = examService.getOne(id);
        return oneExam;
    }

    @PostMapping("exams")
    public ResponseEntity<Exam> insertExam(@RequestBody Exam exam) {
        examService.insert(exam);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("exams")
    public ResponseEntity<Exam> updateExam(@RequestBody Exam exam) {
        examService.update(exam);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("exams/{id}")
    public ResponseEntity<Exam> deleteExam(@PathVariable Integer id) {
        examService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
