package ru.mondayish.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private int age;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "student_mark_storage")
    private List<MarksStorage> marksStorages;
}
