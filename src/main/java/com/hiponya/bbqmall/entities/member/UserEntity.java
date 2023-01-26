package com.hiponya.bbqmall.entities.member;


import java.util.Date;
import java.util.Objects;

public class UserEntity {


    private String email;

    private String id;
    private String password;

    private String name;

    private String contact;

    private String addressPostal;

    private String addressPrimary;

    private String addressSecondary;

    private Date registeredOn;

    private String birth;

    private Boolean isAdmin;

    public Boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public void setName(String name) {
        this.name = name;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public void setAddressPostal(String addressPostal) {
        this.addressPostal = addressPostal;
    }

    public void setAddressPrimary(String addressPrimary) {
        this.addressPrimary = addressPrimary;
    }

    public void setAddressSecondary(String addressSecondary) {
        this.addressSecondary = addressSecondary;
    }

    public void setRegisteredOn(Date registeredOn) {
        this.registeredOn = registeredOn;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


    public String getName() {
        return name;
    }

    public String getContact() {
        return contact;
    }

    public String getAddressPostal() {
        return addressPostal;
    }

    public String getAddressPrimary() {
        return addressPrimary;
    }

    public String getAddressSecondary() {
        return addressSecondary;
    }

    public Date getRegisteredOn() {
        return registeredOn;
    }

    public String getId() {
        return id;
    }

    public UserEntity setId(String id) {
        this.id = id;
        return this;
    }

    public String getBirth() {
        return birth;
    }

    public UserEntity setBirth(String birth) {
        this.birth = birth;
        return this;
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return email == that.email;
    }




}
