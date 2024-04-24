package com.example.ticket_oblig3_data1700;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    private int orderNr;
    private String movies;
    private int totalTickets;
    private String firstName;
    private String lastName;
    private String email;
    private String telephoneNr;

    public Ticket(String movies, int totalTickets, String firstName, String lastName, String email, String telephoneNr) {
        this.movies = movies;
        this.totalTickets = totalTickets;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telephoneNr = telephoneNr;
    }
}