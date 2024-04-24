const nameRegex = /^[A-Za-z]+$/;
const telephoneNrRegex = /^[0-9]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function buyTickets() {
    const ticket = {
        movies: $("#movies").val(),
        totalTickets: $("#totalTickets").val(),
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        telephoneNr: $("#telephoneNr").val()
    }

    //Validate inputboxses
    if ($("#movies").val() === "") {
        $("#moviesError").html("Choose a movie");
    }
    if ($("#totalTickets").val() === "") {
        $("#totalTicketsError").html("Choose total of tickets");
    }
    if (!nameRegex.test(ticket.firstName)) {
        $("#firstNameError").html("Unvalid first name");
    }
    if (!nameRegex.test(ticket.lastName)) {
        $("#lastNameError").html("Unvalid last name");
    }
    if (!telephoneNrRegex.test(ticket.telephoneNr)) {
        $("#telephoneNrError").html("Unvalid telephonenumber");
    }
    if (!emailRegex.test(ticket.email)) {
        $("#emailError").html("Unvalid email");
    } else {
        $.post("/saveTicket", ticket, function () {
            getAllTickets();
        });
        //Clear inputboxses after purchasing
        $("#movies").val("blank");
        $("#totalTickets").val(0);
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $("#telephoneNr").val("");

    }
}


    function getAllTickets() {
        $.get("/getAllTickets", function (ticket) {
            outData(ticket);
        });
    }

    function outData(tickets) {
        let out = "<table><tr><th>Movie</th><th>Number of tickets</th><th>First name</th><th>Last name</th><th>Email</th><th>Telephonenumber</th></tr>";
        for (const ticket of tickets) {
            out += "<tr>" +
                "<td>" + ticket.movies + "</td>" +
                "<td>" + ticket.totalTickets + "</td>" +
                "<td>" + ticket.firstName + "</td>" +
                "<td>" + ticket.lastName + "</td>" +
                "<td>" + ticket.email + "</td>" +
                "<td>" + ticket.telephoneNr + "</td>" +
                "<td><button class='btn btn-info' onclick='modifyTicket("+ticket.orderNr+")'>Modify</button></td>" +
                "<td><button class='btn btn-danger' onclick='deleteTicket("+ticket.orderNr+")'>Delete</button></td>" +
                "</tr>";
        }
        out += "</table>";
        $("#allPurchases").html(out);
        $("#moviesError").html("");
        $("#totalTicketsError").html("");
        $("#firstNameError").html("");
        $("#lastNameError").html("");
        $("#emailError").html("");
        $("#telephoneNrError").html("");
    }

    function deleteTicket(orderNr){
        $.ajax({
            url: "deleteTicket?orderNr="+orderNr,
            type: "DELETE"
        });
        setTimeout(() => {getAllTickets();}, 10);
    }

function deleteAllTickets(){
    $.get("/deleteAllTickets", function (){
        getAllTickets();
    });
}
function modifyTicket(orderNr) {
    $.get("getTicket?orderNr=" + orderNr, function (data) {
        console.log(data)
        $("#orderNr").html(orderNr);
            $("#modifyMovies").val(data.movies);
            $("#modifyTotalTickets").val(data.totalTickets);
            $("#modifyFirstName").val(data.firstName);
            $("#modifyLastName").val(data.lastName);
            $("#modifyEmail").val(data.email);
            $("#modifyTelephoneNr").val(data.telephoneNr);
    });
    $("#modifyInputs").css("display", "block");
    $("#inputs").css("display","none");
}

function updateTicketDB() {
    const ticket = {
        orderNr: $("#orderNr").html(),
        movies: $("#modifyMovies").val(),
        totalTickets: $("#modifyTotalTickets").val(),
        firstName: $("#modifyFirstName").val(),
        lastName: $("#modifyLastName").val(),
        email: $("#modifyEmail").val(),
        telephoneNr: $("#modifyTelephoneNr").val()
    }
    if ($("#movies").val() === "") {
        $("#moviesError").html("Choose a movie");
    }
    if ($("#totalTickets").val() === "") {
        $("#totalTicketsError").html("Choose total of tickets");
    }
    if (!nameRegex.test(ticket.firstName)) {
        $("#firstNameError").html("Unvalid first name");
    }
    if (!nameRegex.test(ticket.lastName)) {
        $("#lastNameError").html("Unvalid last name");
    }
    if (!telephoneNrRegex.test(ticket.telephoneNr)) {
        $("#telephoneNrError").html("Unvalid telephonenumber");
    }
    if (!emailRegex.test(ticket.email)) {
        $("#emailError").html("Unvalid email");
    }
    else{
        $.post("/modifyTicket", ticket, function (){
            getAllTickets();
        });
        $("#modifyInputs").css("display","none");
        $("#inputs").css("display","block");
    }
}
