package ru.mondayish.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "professors")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private int age;

    private String subject;
}
