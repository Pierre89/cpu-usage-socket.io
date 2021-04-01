let os = require("os");

exports.getPercentageUsage = function(interval, callback){
    getPercentageUsage(callback, interval);
}

function getPercentageUsage(callback, interval){
    let start = cpuAverage();

    setTimeout(function() {
        let end = cpuAverage();
		let idleDif = end.idle - start.idle;
		let totalDif = end.total - start.total;

        callback(100 - (100 * idleDif/totalDif));
    }, interval);
}

function cpuAverage() {
    let totalIdle = 0, totalTick = 0;
    let cpus = os.cpus();

	for(let i in cpus){
		let cpu = cpus[i];

		for(t in cpu.times)
			totalTick += cpu.times[t];

		totalIdle += cpu.times.idle;
    }

	return {idle: totalIdle/cpus.length,  total: totalTick/cpus.length};
}
