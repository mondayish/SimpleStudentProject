package ru.mondayish.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "subjects")
@Data
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    private List<MarksStorage> marksStorages;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "subjects_professors")
    @JsonIgnore
    private List<Professor> professors;


}
