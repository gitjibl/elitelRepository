package com.ssm.one.srv.main.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssm.one.dao.main.SnBsbiMapper;
import com.ssm.one.dao.main.ext.ExtSnBsbiMapper;
import com.ssm.one.entity.main.SnBsbi;
import com.ssm.one.entity.main.ext.ExtSnBsbi;
import com.ssm.one.srv.main.service.TestService;
@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	private SnBsbiMapper bsbiMapper;
	
	@Autowired
	private ExtSnBsbiMapper extSnBsbiMapper;

	public List<SnBsbi> selectSnbsbis() {
		// TODO Auto-generated method stub
		return bsbiMapper.selectSnbsbis();
	}

	public List<ExtSnBsbi> selectExtSnbsbis() {
		// TODO Auto-generated method stub
		return extSnBsbiMapper.selectExtSnbsbis();
	}
	
	

}
