package com.guideMS.reservations.repositories;
import com.guideMS.reservations.models.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReservationRepository extends MongoRepository <Reservation, String> { 
	List<Reservation> findBytourId (String tourId);
	List<Reservation> findBytouristId (String touristId);
}
