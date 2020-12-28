package com.demo.giao_one.service.impl;

import com.demo.giao_one.dao.mysql.UserMapper;
import com.demo.giao_one.dao.mysql.ext.ExtUserMapper;
import com.demo.giao_one.entity.User;
import com.demo.giao_one.entity.ext.ExtUser;
import com.demo.giao_one.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ExtUserMapper extUserMapper;

    @Override
    public int InsertUser(User user) {
        return userMapper.insert(user);
    }

    @Override
    public List<ExtUser> selectUsersInfo(ExtUser extUser) {
        return extUserMapper.selectUsersInfo(extUser);
    }


}
