package com.demo.giao_one.service;

import com.demo.giao_one.entity.User;
import com.demo.giao_one.entity.ext.ExtUser;

import java.util.List;

public interface UserService {
    int InsertUser(User user);

    List<ExtUser> selectUsersInfo(ExtUser extUser);
}
