package com.guideMS.reservations.exceptions;

public class ReservationNotFoundException extends RuntimeException{
	public ReservationNotFoundException (String message) {
		super(message);
	}
}
