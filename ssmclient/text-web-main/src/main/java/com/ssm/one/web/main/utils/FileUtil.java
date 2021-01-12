package com.ssm.one.web.main.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

public class FileUtil {

	/**
	 * 下载本地文件
	 * @param response
	 * @param filePath
	 * @param encode
	 */
	public static void downloadLocal(HttpServletResponse response, String filePath,String encode) {
	    response.setContentType("text/html;charset=" + encode);
	    try {
	        // 读到流中
	        InputStream inStream = new FileInputStream(filePath); // 文件的存放路径
	        // path是指欲下载的文件的路径
	        File file = new File(filePath);
	        // 取得文件名
	        String fileName = file.getName();
	        // 设置输出的格式
	        response.reset();
	        response.setContentType("bin");
	        response.addHeader("Content-Disposition", "attachment; filename=\"" + new String(fileName.getBytes(encode), "ISO8859-1") + "\"");
	        // 循环取出流中的数据
	        byte[] b = new byte[100];
	        int len;
	        while ((len = inStream.read(b)) > 0) {
	            response.getOutputStream().write(b, 0, len);
	        }
	        inStream.close();
	    } catch (IOException e) {
	    	e.getMessage();
	    }
	}
}
