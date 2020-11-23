package com.ssm.one.srv.main.service;

import java.util.List;

import com.ssm.one.entity.main.SnBsbi;
import com.ssm.one.entity.main.ext.ExtSnBsbi;

public interface TestService {

	List<SnBsbi> selectSnbsbis();

	List<ExtSnBsbi> selectExtSnbsbis();

}
