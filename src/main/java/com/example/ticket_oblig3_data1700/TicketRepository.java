package com.example.ticket_oblig3_data1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    class TicketRowmapper implements RowMapper<Ticket>{
        @Override
        public Ticket mapRow (ResultSet rs, int rowNum) throws SQLException{
            Ticket ticket = new Ticket();
            ticket.setOrderNr(rs.getInt("orderNr"));
            ticket.setMovies(rs.getString("movies"));
            ticket.setTotalTickets(rs.getInt("totalTickets"));
            ticket.setFirstName(rs.getString("firstName"));
            ticket.setLastName(rs.getString("lastName"));
            ticket.setEmail(rs.getString("email"));
            ticket.setTelephoneNr(rs.getString("telephoneNr"));
            return ticket;
        }
    }
    public void saveTickets(Ticket ticket){
        String sql = "INSERT INTO Ticket (movies, totalTickets, firstName, lastName, email, telephoneNr) VALUES(?,?,?,?,?,?)";
        db.update(sql, ticket.getMovies(), ticket.getTotalTickets(), ticket.getFirstName(), ticket.getLastName(), ticket.getEmail(), ticket.getTelephoneNr());
    }

    public List<Ticket> getAllTickets(){
        List<Ticket> getAllTickets = db.query("SELECT * FROM Ticket ORDER BY lastName", new TicketRowmapper());
        return getAllTickets;
    }

    public void deleteAllTickets(){
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }
    public int deleteTicket(int orderNr){
        String sql = "DELETE FROM Ticket WHERE orderNr=?";
        return db.update(sql,new Object[]{
                orderNr
        });
    }

    public Ticket getTicket(int orderNr){
        return db.queryForObject("SELECT * FROM Ticket WHERE orderNr=?", new TicketRowmapper(), orderNr);
    }

    public int modifyTicket(Ticket ticket){
        String sql = "UPDATE Ticket SET movies=?, totalTickets=?, firstName=?, lastName=?, email=?, telephoneNr=? WHERE orderNr=?";
        return db.update(sql, ticket.getMovies(), ticket.getTotalTickets(), ticket.getFirstName(), ticket.getLastName(), ticket.getEmail(), ticket.getTelephoneNr(), ticket.getOrderNr());
    }
}
