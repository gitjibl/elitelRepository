package com.demo.giao_one.controller;

import com.demo.giao_one.entity.User;
import com.demo.giao_one.entity.ext.ExtUser;
import com.demo.giao_one.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/insertUser")
    public int InsertUser(User user){
        return userService.InsertUser(user);
    }

    @RequestMapping("/selectUsersInfo")
    public List<ExtUser> selectUsersInfo(ExtUser extUser){
        return userService.selectUsersInfo(extUser);
    }
}
