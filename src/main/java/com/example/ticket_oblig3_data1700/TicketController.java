package com.example.ticket_oblig3_data1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class TicketController {

    @Autowired private TicketRepository rep;

    @PostMapping("/saveTicket")
    public void saveTicket(Ticket ticket){
        rep.saveTickets(ticket);
    }

    @GetMapping("/getAllTickets")
    public List<Ticket> getAllTickets() {
        return rep.getAllTickets();
    }

    @GetMapping("/getTicket")
    public Ticket getTicket(@RequestParam int orderNr){
        return rep.getTicket(orderNr);
    }

    @PostMapping("/modifyTicket")
    public void modifyTicket(Ticket ticket){
        rep.modifyTicket(ticket);
    }

    @GetMapping("/deleteAllTickets")
    public void deleteAllTickets(){
        rep.deleteAllTickets();
    }

    @DeleteMapping("/deleteTicket")
    public void deleteTicket(int orderNr){
        rep.deleteTicket(orderNr);
    }
}

