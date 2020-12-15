package ru.mondayish.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "professors")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private int age;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "subjects_professors")
    private List<Subject> subjects;
}
