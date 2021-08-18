import React, { Component } from "react";

const USERS_API_URL = "http://localhost:8081/api/users";
const options = [
    {
        label: "user1",
        value: "user1@nagarro.com",
    },
    {
        label: "user1",
        value: "user1@nagarro.com",
    }
];


class UsersSelect extends Component{

        constructor(props){
            super(props);   
            console.log("da");
            var getUsersRequest = new XMLHttpRequest();
            getUsersRequest.open("GET" , USERS_API_URL);
            getUsersRequest.setRequestHeader("Content-Type", "application/json");
            getUsersRequest.setRequestHeader("Authorization",
             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVEVDSCIsIm1haWwiOiJ0IiwiZXhwIjoxNjI5Mjk0ODEwLCJpYXQiOjE2MjkyOTEyMTB9.phbtMXILIISUKfKAXyXFztGxqw7TBk-zmdX9-ibL5Ys" );
            getUsersRequest.send();
            var response = JSON.parse(getUsersRequest.response);
            console.log(response);
        }
        render(){
            return (
                <div id="UsersSelect">
                    <select>
                      {
                         options.map((option) => (
                          <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                </div>
              );
        }
}
export default UsersSelect;