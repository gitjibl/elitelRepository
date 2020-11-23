//做拟合曲线。
(function () {

	//least square method; data为原始数据，maxPower幂最大
	//Math.leastSquares = function (data, maxPower) {
	//	var coefficients = Math.calcCoefficients(data, maxPower);
	//	var rtn = new Array(data.length);
	//	for (var i = 0; i < data.length; i++) {
	//		rtn[i] = new Array(2);
	//		rtn[i][0] = data[i][0];
	//		rtn[i][1] = Math.calcYFromCoefficients(data[i][0], coefficients);
	//	}
	//	return rtn;
	//}

    /*
     *最小二乘法平差。
     *做拟合曲线。
     */
	Math.leastSquares = function (data, maxPower) {
	    var coefficients = Math.calcCoefficients(data, maxPower);
	    var key = new Array();
	    for (var i = 0; i < data.length; i++) {
	        if ($.inArray(data[i][0], key) == -1) {
	            key.push(data[i][0]);
	        }
	    }
	    key.sort();
	    var pointLength = 20;
	    var tick = (key[key.length - 1] - key[0]) / pointLength;
	    var rtn = new Array(key.length);
	    for (var i = 0; i <= pointLength; i++) {
	        rtn[i] = new Array(2);
	        rtn[i][0] = key[0] + tick * i;
	        rtn[i][1] = Math.calcYFromCoefficients(key[0] + tick * i, coefficients);
	    }
	    //var rtn = new Array(key.length);
	    //for (var i = 0; i < key.length; i++) {
	    //    rtn[i] = new Array(2);
	    //    rtn[i][0] = key[i];
	    //    rtn[i][1] = Math.calcYFromCoefficients(key[i], coefficients);
	    //}
	    return rtn;
	}

	Math.calcYFromCoefficients = function (x, coefficients) {
		var t = 0;
		for (var i = 0; i < coefficients.length; i++) {
			t += coefficients[i] * Math.pow(x, i);
		}
		return t;
	}

	Math.computGauss = function (guass, n) {
		var i, j, k, m;
		var temp, max;
		var x = new Array(n);
		for (i = 0; i < n; i++) {
			x[i] = 0.0;
			for (j = 0; j < n; j++) {
				max = 0;
				k = j;
				for (i = j; i < n; i++) {
					if (Math.abs(guass[i][j]) > max) {
						max = guass[i][j];
						k = i;
					}
				}
				if (k != j) {
					for (m = j; m < n + 1; m++) {
						temp = guass[j][m];
						guass[j][m] = guass[k][m];
						guass[k][m] = temp;
					}
				}
				if (0 == max) {
					
					return x;
				}
				for (i = j + 1; i < n; i++) {
					s = guass[i][j];
					for (m = j; m < n + 1; m++) {
						guass[i][m] = guass[i][m] - guass[j][m] * s / (guass[j][j]);
					}
				}
			}
			for (i = n - 1; i >= 0; i--) {
				s = 0;
				for (j = i + 1; j < n; j++) {
					s = s + guass[i][j] * x[j];
				}
				x[i] = (guass[i][n] - s) / guass[i][i];
			}
			return x;
		}
	}

	Math.sumXy = function (data, n1, n2, length) {
		var s = 0;
		for (var i = 0; i < length; i++) {
			if ((data[i][0] != 0 || n1 != 0) && (data[i][1] != 0 || n2 != 0))
				s = s + Math.pow(data[i][0], n1) * Math.pow(data[i][1], n2);
			else
				s = s + 1;
		}
		return s;
	}

	Math.sumX = function (data, n, length) {
		var s = 0;
		for (var i = 0; i < length; i++) {
			if (data[i][0] != 0 || n != 0)
				s = s + Math.pow(data[i][0], n);
			else
				s = s + 1;
		}
		return s;
	}

	Math.calcCoefficients = function (data, maxPower) {
		var n = maxPower + 1;
		var guass = new Array(n);

		for (var i = 0; i < n; i++) {
			guass[i] = new Array(n + 1);
			var j;
			for (j = 0; j < n; j++) {
				guass[i][j] = Math.sumX(data, j + i, data.length);
			}
			guass[i][j] = Math.sumXy(data, i, 1, data.length);
		}
		return Math.computGauss(guass, n);
	}
}())
