package com.guideMS.reservations.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Reservation {
	@Id
	private String id;
	private Integer numberHours;
	private String tourId;
	private String touristId;
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	private Date time;

	public Reservation(String id, Integer numberHours, Date time, String tourId, String touristId) {
		super();
		this.id = id;
		this.numberHours = numberHours;
		this.time = time;
		this.tourId = tourId;
		this.touristId = touristId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getNumberHours() {
		return numberHours;
	}

	public void setNumberHours(Integer numberHours) {
		this.numberHours = numberHours;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getTourId() {
		return tourId;
	}

	public void setTourId(String tourId) {
		this.tourId = tourId;
	}

	public String getTouristId() {
		return touristId;
	}

	public void setTouristId(String touristId) {
		this.touristId = touristId;
	}

}
