package com.ane56.domain;


public class FilmSeats {
	
	private Long id; 
	private String sellIckets;
	private Long filmId;
	private Long userId;
	private int isDeleted;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSellIckets() {
		return sellIckets;
	}
	public void setSellIckets(String sellIckets) {
		this.sellIckets = sellIckets;
	}
	public Long getFilmId() {
		return filmId;
	}
	public void setFilmId(Long filmId) {
		this.filmId = filmId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public int getIsDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
}
