package com.guideMS.reservations.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.guideMS.reservations.exceptions.ReservationNotFoundException;
import com.guideMS.reservations.models.Reservation;
import com.guideMS.reservations.repositories.ReservationRepository;

@RestController
public class ReservationController {
	private final ReservationRepository reservationRepository;
	public ReservationController (ReservationRepository reservationRepository) {
		this.reservationRepository=reservationRepository;
	}
	
	@GetMapping("/reservation/{id}")
	Reservation getReservation(@PathVariable String id) {
		return reservationRepository.findById(id).orElseThrow(()->
		new ReservationNotFoundException("no se ha encontrado la reserva buscada"));
	}
	@GetMapping("/reservationsTour/{idtour}")
	List<Reservation> getReservationsTour(@PathVariable String idtour) {
		return reservationRepository.findBytourId(idtour);
	}
	@GetMapping("/reservationsT/{idtourist}")
	List<Reservation> getReservationsTourist(@PathVariable String idtourist) {
		return reservationRepository.findBytouristId(idtourist);
	}
	@PostMapping("/c_reservation")
	Reservation newReservation(@RequestBody Reservation reservation) {
		return reservationRepository.save(reservation);
	}
}
