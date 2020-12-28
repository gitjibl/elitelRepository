package com.demo.giao_one.dao.mysql.ext;

import com.demo.giao_one.entity.ext.ExtUser;

import java.util.List;

public interface ExtUserMapper {
    List<ExtUser> selectUsersInfo(ExtUser extUser);
}
